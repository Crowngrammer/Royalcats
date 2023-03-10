import {
    State
} from '@identity.com/solana-gateway-ts';
import logger from '../logger';
import {
    pollUntilConditionMet
} from './utils';
const pollForActiveOnChainToken = async (chainImplementation) => {
    return pollUntilConditionMet(chainImplementation.findGatewayToken, (onChainToken) => {
            if (!onChainToken)
                return false; // keep polling
            if (onChainToken.state === State.ACTIVE)
                return true;
            throw new Error('Token found but not ACTIVE');
        }, 2000, // wait 2 seconds between retries
        20 // poll 20 times
    );
};
const GatewayTokenActionCreatorImplementation = ({
    wallet,
    chainImplementation,
    gatekeeperClient,
    dispatch,
}) => {
    const logDebug = (message, obj = null) => logger.debug(`[useChain] ${message}`, obj);
    const logError = (message, obj = null) => logger.error(`[useChain] ${message}`, obj);
    const isTokenCreated = (code) => code === 200;
    const isTokenPending = (code) => code === 202 || code === 404;
    const isFailure = (code) => !isTokenPending(code) && code >= 400;
    const waitForGatewayToken = async () => {
        // poll the gatekeeper until we have a status for a created record
        // if we don't get a created token, then we consider it a failure
        const code = await gatekeeperClient().pollGatekeeperStatus(wallet.publicKey);
        if (isTokenCreated(code)) {
            const token = await pollForActiveOnChainToken(chainImplementation);
            logDebug('Result from pollForActiveOnChainToken', token);
            if (!token) {
                logError(`Token not found onChain: ${code}`);
                throw new Error(`Token not found onChain: ${code}`);
            }
            dispatch({
                type: 'tokenChange',
                token
            });
            dispatch({
                type: 'civicPass_check_token_status',
                token
            });
            return;
        }
        // retries have been exhausted and we still don't have a token
        // or the gatekeeper threw an error during issuance attempt
        if (isTokenPending(code) || isFailure(code)) {
            logError('Failed to find Gateway token', code);
            dispatch({
                type: 'gatekeeperError'
            });
            return;
        }
        throw new Error(`setTokenIfCreatedStatus error: ${code}`);
    };
    return {
        waitForGatewayToken
    };
};
export {
    GatewayTokenActionCreatorImplementation
};