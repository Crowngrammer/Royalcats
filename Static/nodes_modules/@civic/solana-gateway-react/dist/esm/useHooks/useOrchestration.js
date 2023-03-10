import {
    useCallback,
    useEffect
} from 'react';
import {
    getGatekeeperEndpoint
} from '../solana/config';
import logger from '../logger';
import {
    GatekeeperRecordState,
    State,
    CivicPassMessageAction,
    RefreshTokenState,
    GatewayStatus,
} from '../types';
import useChain from './useChain';
import useRefresh from './useRefresh';
import useWalletHooks from './useWalletHooks';
import {
    gatewayTokenActionCreator
} from '../actionCreator';
import usePowo from './usePOWO';
import useGatekeeper from './useGatekeeper';
import useGatekeeperRecord from './useGatekeeperRecord';
export const shouldRefreshToken = async (state, gatewayToken, useWallet, powoRequested) => {
    if (!gatewayToken)
        return false;
    if (gatewayToken.state !== State.ACTIVE)
        return false;
    if (!useWallet || !useWallet.publicKey || powoRequested)
        return false;
    return state !== GatekeeperRecordState.ISSUED;
};
/**
 * The orchestrator hook handles the main business logic of the component handling 2 main scenarios:
 * 1. the creation of a new gateway token for a new user
 * 2. the refreshing of an existing token for an existing user
 *
 * The orchestrator triggers uses effects to trigger flows for these two scenarios
 *
 * @param {{ wallet: WalletAdapter | undefined; clusterUrl: string; gatekeeperNetworkAddress: string | undefined; stage: string }} param0
 * @param {Partial<RootState>} state
 * @param {React.Dispatch<Action>} dispatch
 * @returns void
 */
const useOrchestration = ({
    wallet,
    stage,
    chainImplementation,
    gatekeeperClient,
}, state, dispatch) => {
    const {
        expectWalletConnected
    } = useWalletHooks(wallet, state, dispatch);
    const gatekeeperEndpoint = getGatekeeperEndpoint(stage);
    // Register our hooks here
    const {
        setRefreshPoll,
        refreshTokenWithProof
    } = useRefresh({
        stage,
        gatekeeperClient
    }, state, dispatch);
    const {
        waitForConfirmPOWO,
        waitForPOWO
    } = usePowo({
        wallet,
        chainImplementation
    }, state, dispatch);
    const {
        waitForGatekeeperIssuanceRequest
    } = useGatekeeper({
        wallet,
        stage,
        gatekeeperClient
    }, state, dispatch);
    useGatekeeperRecord({
        wallet,
        gatekeeperClient,
        httpConfig: chainImplementation.httpConfig
    }, state, dispatch);
    useChain({
        wallet,
        chainImplementation
    }, state, dispatch);
    const {
        gatewayToken,
        tokenRequested,
        refreshIntervalId,
        powoRequested,
        refreshInProgress,
        walletToRefresh,
        civicPass,
        refreshTokenState,
        gatewayStatus,
    } = state;
    /**
     * Refresh Flows ----------------------------------------------------------------
     */
    /**
     * wait until we have a payload that has been emitted by the CivicPass iframe
     * then resolve the promise
     */
    const waitForCivicPassRefreshResponsePayload = useCallback(() => {
        expectWalletConnected();
        logger.debug('waitForCivicPassRefreshResponsePayload');
        const result = new Promise((resolve) => {
            const responsePayload = civicPass === null || civicPass === void 0 ? void 0 : civicPass.responsePayload;
            const refreshPayload = responsePayload && responsePayload[CivicPassMessageAction.REFRESH];
            logger.debug('Refresh payload...', refreshPayload);
            if (refreshPayload) {
                resolve(refreshPayload);
            }
        });
        return result;
    }, [civicPass === null || civicPass === void 0 ? void 0 : civicPass.responsePayload, expectWalletConnected]);
    /**
     * wait until a gateway token exists in state before resolving the promise
     */
    const waitForGatewayToken = useCallback(() => {
        expectWalletConnected();
        return new Promise((resolve) => {
            logger.debug('waitForGatewayToken gatewayToken', !!gatewayToken);
            if (gatewayToken)
                resolve(gatewayToken);
        });
    }, [gatewayToken, expectWalletConnected]);
    const checkRefreshRequired = useCallback(async (connectedWallet) => {
        const useWallet = walletToRefresh || connectedWallet; // prefer the wallet set in state, this handles polling after disconnect
        // Check preconditions for refresh:
        await waitForGatewayToken();
        if (!gatewayToken)
            return;
        const record = await gatekeeperClient().getGatekeeperRecordWithPayload(gatewayToken.owner);
        const shouldRefresh = await shouldRefreshToken(record.state, gatewayToken, useWallet, powoRequested);
        dispatch({
            type: 'getGatekeeperRecord_success',
            gatekeeperRecord: record
        });
        if (!shouldRefresh) {
            logger.debug('Refresh not needed. Skipping this attempt.');
            dispatch({
                type: 'refresh_complete'
            });
            setRefreshPoll(useWallet);
            return;
        }
        logger.debug('Refresh required. Running the refresh flow.');
        clearInterval(refreshIntervalId);
        dispatch({
            type: 'refresh_start'
        });
        dispatch({
            type: 'civicPass_check_token_status'
        });
        dispatch({
            type: 'refresh_clear_interval'
        });
    }, [gatekeeperEndpoint, gatewayToken, powoRequested, refreshInProgress, refreshIntervalId, wallet, walletToRefresh]);
    /**
     * Check if the user needs to refresh their roken
     */
    useEffect(() => {
        if (refreshTokenState === RefreshTokenState.CHECK_TOKEN_EXPIRATION) {
            logger.debug('Checking if refresh required');
            checkRefreshRequired();
        }
    }, [refreshTokenState]);
    /**
     * If the user cancels out of the refresh flow start the refresh interval
     */
    useEffect(() => {
        if (refreshTokenState === RefreshTokenState.CANCELLED || refreshTokenState === RefreshTokenState.FAILED) {
            logger.debug('User canceled out of the refresh flow');
            setRefreshPoll(wallet);
        }
    }, [refreshTokenState]);
    /**
     * When we have a token start polling to determine the refresh state
     */
    useEffect(() => {
        if (gatewayStatus === GatewayStatus.ACTIVE) {
            logger.debug('Start polling for the record');
            setRefreshPoll(wallet);
        }
    }, [gatewayStatus]);
    /**
     * Issuance Flows ----------------------------------------------------------------
     */
    /**
     * poll until a gatekeeper record is found, once active check the chain for a token
     * then dispatch a tokenChange event that will result in the token getting saved to state
     * start token refresh polling once a valid token is set
     */
    const waitForCreatedGatekeeperRecord = useCallback(async () => {
        if (wallet) {
            logger.debug('waitForCreatedGatekeeperRecord');
            const actionCreator = gatewayTokenActionCreator({
                gatekeeperClient,
                wallet,
                chainImplementation,
                dispatch,
            });
            await actionCreator.waitForGatewayToken();
        }
        return null;
    }, [gatekeeperEndpoint, gatekeeperClient, expectWalletConnected]);
    /**
     * wait until a presentation request id has been emitted by the CivicPass iframe
     * then resolve the promise
     */
    const waitForCivicPassIssuanceResponsePayload = useCallback(() => {
        expectWalletConnected();
        logger.debug('waitForCivicPassIssuanceResponsePayload');
        const result = new Promise((resolve) => {
            const responsePayload = civicPass === null || civicPass === void 0 ? void 0 : civicPass.responsePayload;
            const issuancePayload = responsePayload && responsePayload[CivicPassMessageAction.ISSUANCE];
            logger.debug('Issuance payload...', issuancePayload);
            if (issuancePayload !== undefined && issuancePayload.requiresProofOfWalletOwnership) {
                resolve(issuancePayload);
            }
        });
        return result;
    }, [civicPass === null || civicPass === void 0 ? void 0 : civicPass.responsePayload, expectWalletConnected]);
    /**
     * wait until the user has requested a gateway token before resolving the promise
     */
    const waitForTokenRequested = useCallback(() => {
        expectWalletConnected();
        return new Promise((resolve) => {
            logger.debug('waitForTokenRequested tokenRequested', tokenRequested);
            if (tokenRequested)
                resolve(true);
        });
    }, [tokenRequested, expectWalletConnected]);
    /**
     * wait until the user has requested a gateway token before resolving the promise
     */
    const checkForRequiredProof = useCallback(async ({
        requiresProofOfWalletOwnership,
        payload,
    }) => {
        if (requiresProofOfWalletOwnership) {
            const result = await waitForConfirmPOWO(payload).then(waitForPOWO);
            return result;
        }
        return {
            proof: null,
            payload
        };
    }, [waitForConfirmPOWO, waitForPOWO]);
    /**
     * New token request flow:
     * wait for the user to request a new token
     * wait for the iframe to return a payload
     * wait for the user to confirm they've read the proof of ownership dialogue
     * wait for the user to provide proof of ownership
     * wait for a call to the gatekeeper to request a new token issuance
     * wait for a gatekeeper record to be created
     * once this flow is complete a new Gatekeeper token should be available and set in state
     */
    useEffect(() => {
        if (wallet && wallet.publicKey) {
            logger.debug('newTokenRequestFlow');
            waitForTokenRequested()
                .then(waitForCivicPassIssuanceResponsePayload)
                .then(checkForRequiredProof)
                .then(waitForGatekeeperIssuanceRequest)
                .then(waitForCreatedGatekeeperRecord)
                .then(() => setRefreshPoll(wallet))
                .catch((error) => logger.error('ERROR newTokenRequestFlow', error));
        }
    }, [
        waitForTokenRequested,
        waitForCivicPassIssuanceResponsePayload,
        checkForRequiredProof,
        waitForGatekeeperIssuanceRequest,
        waitForCreatedGatekeeperRecord,
    ]);
    /**
     * Refresh flow:
     * wait refresh to be triggered from the iFrame
     * wait for the iframe to return a payload
     * wait for the user to confirm they've read the proof of ownership dialogue
     * wait for the user to provide proof of ownership
     * wait for a call to the gatekeeper to refresh the token
     * start the polling interval
     */
    const refreshFlow = useCallback(async (connectedWallet) => {
        const useWallet = walletToRefresh || connectedWallet;
        // Do the refresh flow.
        waitForCivicPassRefreshResponsePayload()
            .then(checkForRequiredProof)
            .then(refreshTokenWithProof(useWallet))
            .then(() => setRefreshPoll(useWallet))
            .then(() => {
                dispatch({
                    type: 'refresh_complete'
                });
            })
            .catch((error) => {
                logger.error('refreshFlow', error);
                logger.error('refreshToken error', error);
                dispatch({
                    type: 'refresh_complete'
                });
                setRefreshPoll(useWallet);
            });
    }, [
        gatekeeperEndpoint,
        gatewayToken,
        powoRequested,
        refreshInProgress,
        waitForConfirmPOWO,
        waitForGatewayToken,
        waitForPOWO,
        wallet,
        walletToRefresh,
        checkForRequiredProof,
    ]);
    /**
     * Start the refresh flow
     */
    useEffect(() => {
        if (refreshTokenState === RefreshTokenState.REQUIRES_POWO) {
            logger.debug('Start the refresh flow');
            refreshFlow(wallet);
        }
    }, [wallet, refreshTokenState]);
};
export default useOrchestration;