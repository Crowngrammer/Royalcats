import {
    useEffect
} from 'react';
import {
    GatekeeperRecordState,
    GatewayStatus
} from '../types';
import logger from '../logger';
import useWalletHooks from './useWalletHooks';
export const reducer = (state, action) => {
    switch (action.type) {
        case 'tokenOnChainNotFound':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.NOT_REQUESTED
            });
        case 'tokenOnChainError':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.ERROR
            });
        default:
            return state;
    }
};
const useChain = ({
    wallet,
    chainImplementation,
}, state, dispatch) => {
    const {
        expectWalletConnected
    } = useWalletHooks(wallet, state, dispatch);
    const {
        gatekeeperRecordState,
        gatewayToken
    } = state;
    const logDebug = (message, obj = null) => logger.debug(`[useChain] ${message}`, obj);
    const logError = (message, obj = null) => logger.error(`[useChain] ${message}`, obj);
    const removeOnChainListener = (listernerId) => {
        try {
            logDebug('Removing onChainListener with id: ', listernerId);
            chainImplementation.removeOnGatewayTokenChangeListener(listernerId);
        } catch (error) {
            logError('Error removing on chain listener', error);
        }
    };
    /**
     * listen to the blockchain for any token changes and update local state if there are
     */
    const addTokenChangeListeners =
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (gatewayToken) => {
            const tokenChangeCallback = (token) => {
                dispatch({
                    type: 'tokenChange',
                    token
                });
                dispatch({
                    type: 'civicPass_check_token_status',
                    token
                });
            };
            const listernerId = chainImplementation.addOnGatewayTokenChangeListener(gatewayToken, tokenChangeCallback);
            logDebug('Adding onChainListener with id: ', listernerId);
            return listernerId;
        };
    useEffect(() => {
        let listernerId;
        if (gatewayToken) {
            listernerId = addTokenChangeListeners(gatewayToken);
        }
        return () => {
            if (listernerId) {
                removeOnChainListener(listernerId);
            }
        };
    }, [gatekeeperRecordState, gatewayToken]);
    /**
     * use the on-chain lookup utility findGatewayToken to retrieve a token from the chain
     * when a token is found, set up listeners to monitor any on-chain changes
     */
    const dispatchTokenFromChain = async () => {
        const connectedWallet = expectWalletConnected();
        try {
            logDebug('Fetching token from chain');
            const token = await chainImplementation.findGatewayToken();
            if (!token) {
                dispatch({
                    type: 'tokenOnChainNotFound'
                });
                return;
            }
            logDebug('Token found', token);
            dispatch({
                type: 'tokenChange',
                token
            });
            // Determine if we should show the civicPass dialog when we have a gateway token
            const shouldDispatchTokenFromChain = gatekeeperRecordState && [
                GatekeeperRecordState.ISSUED_EXPIRED,
                GatekeeperRecordState.ISSUED_EXPIRY_APPROACHING,
                GatekeeperRecordState.ISSUED_LOCATION_NOT_SUPPORTED,
            ].includes(gatekeeperRecordState);
            if (!shouldDispatchTokenFromChain)
                return;
            dispatch({
                type: 'civicPass_check_token_status',
                token
            });
        } catch (error) {
            logError(`Error getting token from chain for ${connectedWallet.publicKey}`, error);
            dispatch({
                type: 'tokenOnChainError'
            });
            throw error;
        }
    };
    /**
     * Determine if we should fetch a token from chain based on the gatekeeper record state
     */
    useEffect(() => {
        const shouldDispatchTokenFromChain = gatekeeperRecordState && [
            GatekeeperRecordState.ISSUED,
            GatekeeperRecordState.ISSUED_EXPIRED,
            GatekeeperRecordState.ISSUED_EXPIRY_APPROACHING,
            GatekeeperRecordState.REQUESTED,
            GatekeeperRecordState.ISSUED_LOCATION_NOT_SUPPORTED,
            GatekeeperRecordState.SERVER_FAILURE,
        ].includes(gatekeeperRecordState);
        if (!shouldDispatchTokenFromChain)
            return;
        dispatchTokenFromChain();
    }, [gatekeeperRecordState]);
    return {
        addTokenChangeListeners,
        dispatchTokenFromChain,
    };
};
export default useChain;