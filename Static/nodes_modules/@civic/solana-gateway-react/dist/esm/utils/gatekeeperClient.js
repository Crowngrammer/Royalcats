import fetchBuilder from 'fetch-retry-ts';
import {
    GatekeeperRecordState
} from '../types';
import logger from '../logger';
import {
    getDefaultApiNumRetries
} from '../config';
const testRetryMultipler = () => parseFloat(process.env.TEST_RETRY_MULTIPLIER || '') || 1;
export default class GatekeeperClient {
    constructor(gatekeeperClientConfig) {
        this.baseUrl = gatekeeperClientConfig.baseUrl;
        this.stage = gatekeeperClientConfig.stage;
        this.queryParams = gatekeeperClientConfig.queryParams;
        this.fetchImplementation = gatekeeperClientConfig.fetchImplementation || fetch;
        // By default retry on every 5xx or other Error (e.g. network failure):
        this.defaultRetryParams = {
            retries: gatekeeperClientConfig.numRetries || getDefaultApiNumRetries(this.stage),
            retryOn: (attempt, retries, error, response) => attempt < retries && (!!error || !response || response.status >= 500),
            retryDelay: (attempt) => 2 ** attempt * 1000 * testRetryMultipler(),
        };
        this.fetchWithRetry = fetchBuilder(this.fetchImplementation, this.defaultRetryParams);
    }
    addQueryParams(url) {
        if (!this.queryParams)
            return;
        Object.entries(this.queryParams).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    urlForWallet(walletAddress) {
        const url = new URL(`${this.baseUrl}/${walletAddress}`);
        this.addQueryParams(url);
        return url.toString();
    }
    async getGatekeeperRecordWithPayload(walletAddress) {
        return this.fetchWithRetry(this.urlForWallet(walletAddress), {
            method: 'GET',
        }).then(async (response) => ({
            state: GatekeeperRecordState[GatekeeperRecordState[response.status]],
            payload: await response.json(),
        }));
    }
    /**
     * Polls the gatekeeper status until 2xx or 4xx is received except 404 for which it retries.
     */
    async pollGatekeeperStatus(walletAddress) {
        const isTokenCreated = (code) => code === 200;
        const isFailure = (code) => code !== 404 && code >= 400 && code < 500;
        const pollRetryParams = Object.assign(Object.assign({}, this.defaultRetryParams), {
            retries: 5 * 30,
            retryOn: (attempt, retries, error, response) => attempt < retries &&
                (!!error || !response || (!isTokenCreated(response.status) && !isFailure(response.status))),
            retryDelay: 2000 * testRetryMultipler()
        });
        const pollingFetch = fetchBuilder(this.fetchImplementation, pollRetryParams);
        const pollRes = pollingFetch(this.urlForWallet(walletAddress), {
            method: 'HEAD',
        });
        return pollRes.then(({
            status
        }) => status);
    }
    async requestGatewayTokenFromGatekeeper({
        wallet,
        payload,
        proof
    }) {
        // produce a signature that proves ownership of a wallet
        logger.debug('requestGatewayTokenFromGatekeeper request', Object.assign(Object.assign({}, payload), {
            proof
        }));
        // We only pass the wallet public key as part of the request if
        // it was not passed as part of the presentation.
        const body = Object.assign(Object.assign({}, payload), {
            proof,
            address: wallet.publicKey
        });
        const gatewayTokenCreationRequest = Object.assign(Object.assign({}, body), {
            proof
        });
        logger.debug('requestGatewayTokenFromGatekeeper Requesting a new gatekeeper token...', gatewayTokenCreationRequest);
        const url = new URL(this.baseUrl);
        this.addQueryParams(url);
        return this.fetchWithRetry(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gatewayTokenCreationRequest),
        }).then((resp) => resp);
    }
    /**
     * Tries to refresh a token.
     * If it fails with a 5xx, handleFetchError will retry a number of times.
     */
    async refreshToken(gatewayTokenKey, walletPublicKey, proof, payload) {
        logger.debug('refreshToken...', {
            gatewayTokenKey,
            payload
        });
        logger.debug('Attempting to refresh the Gateway token');
        return this.fetchWithRetry(this.urlForWallet(walletPublicKey), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.assign({
                proof,
                request: 'refresh'
            }, payload)),
        });
    }
}