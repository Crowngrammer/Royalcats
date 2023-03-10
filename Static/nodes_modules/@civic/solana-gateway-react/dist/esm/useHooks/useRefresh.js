import {
    useCallback
} from 'react';
import {
    statusFromToken
} from '../useReducer/utils';
import {
    getRefreshIntervalMs
} from '../config';
import logger from '../logger';
import {
    GatewayStatus,
    RefreshTokenState
} from '../types';
export const reducer = (state, action) => {
    switch (action.type) {
        case 'refresh_status_check':
            {
                return Object.assign(Object.assign({}, state), {
                    walletPowoInProgress: false,
                    powoFinished: false,
                    powoRequested: undefined,
                    refreshInProgress: true,
                    refreshIntervalId: action.refreshIntervalId,
                    walletToRefresh: action.walletToRefresh,
                    refreshTokenState: RefreshTokenState.CHECK_TOKEN_EXPIRATION
                });
            }
        case 'refresh_start':
            {
                return Object.assign(Object.assign({}, state), {
                    gatewayStatus: GatewayStatus.REFRESH_TOKEN_REQUIRED,
                    refreshTokenState: RefreshTokenState.IN_PROGRESS
                });
            }
        case 'refresh_complete':
            {
                return Object.assign(Object.assign({}, state), {
                    refreshTokenState: RefreshTokenState.COMPLETED,
                    gatewayStatus: statusFromToken(state, state.gatewayToken)
                });
            }
        case 'refresh_with_powo_in_progress':
            {
                return Object.assign(Object.assign({}, state), {
                    renderIframe: false,
                    iframeMinimized: true,
                    gatewayStatus: GatewayStatus.COLLECTING_USER_INFORMATION
                });
            }
        case 'refresh_clear_interval':
            return Object.assign(Object.assign({}, state), {
                refreshIntervalId: undefined
            });
        case 'refresh_set_interval':
            return Object.assign(Object.assign({}, state), {
                refreshIntervalId: action.refreshIntervalId
            });
        default:
            return state;
    }
};
const useRefresh = ({
    stage,
    gatekeeperClient
}, state, dispatch) => {
    const {
        refreshIntervalId,
        gatewayToken
    } = state;
    const logDebug = (message, obj = null) => logger.debug(`[useRefresh] ${message}`, obj);
    const logError = (message, obj = null) => logger.error(`[useRefresh] ${message}`, obj);
    /**
     * if a refresh interval hasn't already been set, create one that will dispatch the startRefresh
     * event, triggering the refreshFlow
     */
    const setRefreshPoll = useCallback((connectedWallet) => {
        if (!refreshIntervalId) {
            const interval = setInterval(() => {
                dispatch({
                    type: 'refresh_status_check',
                    refreshIntervalId: interval,
                    walletToRefresh: connectedWallet,
                });
            }, getRefreshIntervalMs(stage)); // this will be cleared on completion
            // We need to know that the interval was set even if it has not fired yet.
            // to avoid setting duplicate intervals.
            dispatch({
                type: 'refresh_set_interval',
                refreshIntervalId: interval,
            });
            logger.debug('setRefreshPoll setInterval', getRefreshIntervalMs(stage));
        }
    }, [refreshIntervalId, stage]);
    /**
     * use the passed proof of wallet ownership string to call the gatekeeper refresh token
     * endpoint.
     * On server error (5xx), retry with backoff.
     * On all other errors, e.g. 400, move to a REFRESH_FAILED state.
     */
    const refreshTokenWithProof = useCallback((useWallet) => ({
        proof,
        payload
    }) => {
        return new Promise((resolve, reject) => {
            logDebug('Refresh token with proof', proof);
            if (proof && gatewayToken) {
                dispatch({
                    type: 'refresh_with_powo_in_progress'
                });
                gatekeeperClient()
                    .refreshToken(gatewayToken.identifier, useWallet.publicKey, proof, payload)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        logError('Error refreshing token with proof', error);
                        reject(error);
                    });
            }
        });
    }, [gatewayToken, gatekeeperClient, setRefreshPoll]);
    return {
        setRefreshPoll,
        refreshTokenWithProof,
    };
};
export default useRefresh;