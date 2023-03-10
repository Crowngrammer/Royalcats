import {
    useCallback,
    useEffect
} from 'react';
import {
    getGatekeeperEndpoint
} from '../solana/config';
import logger from '../logger';
import useWalletHooks from './useWalletHooks';
const useGatekeeper = ({
    wallet,
    stage,
    gatekeeperClient,
}, state, dispatch) => {
    const gatekeeperEndpoint = getGatekeeperEndpoint(stage);
    const {
        expectWalletConnected
    } = useWalletHooks(wallet, state, dispatch);
    const {
        tokenIssuanceState,
        gatekeeperNetworkAddress
    } = state;
    /**
     * if a request is not already in progress, initiate a request to the gatekeeper for a new token
     * and dispatch an event so we know it's in progress
     */
    const waitForGatekeeperIssuanceRequest = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        async ({
            payload,
            proof
        }) => {
            const connectedWallet = expectWalletConnected();
            if (connectedWallet) {
                logger.debug('waitForGatekeeperIssuanceRequest ready to call requestGatewayTokenFromGatekeeper', {
                    payload,
                });
                dispatch({
                    type: 'requestGatekeeperIssuance'
                });
                const requestGatewayTokenFromGatekeeperResult = await gatekeeperClient().requestGatewayTokenFromGatekeeper({
                    wallet: connectedWallet,
                    payload,
                    proof,
                });
                logger.debug('requestGatewayTokenFromGatekeeperResult', requestGatewayTokenFromGatekeeperResult);
                if (requestGatewayTokenFromGatekeeperResult.status >= 400) {
                    logger.error('Error requesting token from gatekeeper');
                    dispatch({
                        type: 'requestGatekeeperIssuanceFailed'
                    });
                    throw new Error('Error requesting token from gatekeeper');
                }
                logger.debug('Successfully created gatekeeper token');
                dispatch({
                    type: 'requestGatekeeperIssuanceComplete'
                });
            }
        }, [gatekeeperEndpoint, gatekeeperClient, tokenIssuanceState, expectWalletConnected, stage]);
    /**
     * Update the state when the Gatekeeper network changes
     */
    useEffect(() => {
        if (wallet && wallet.publicKey && gatekeeperNetworkAddress) {
            dispatch({
                type: 'gatekeeperNetworkChanged',
                gatekeeperNetworkAddress
            });
        }
    }, [gatekeeperNetworkAddress]);
    return {
        waitForGatekeeperIssuanceRequest,
        gatekeeperClient,
    };
};
export default useGatekeeper;