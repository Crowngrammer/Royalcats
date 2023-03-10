import logger from '../logger';
import {
    CivicPassMessageAction,
    GatewayStatus,
    RefreshTokenState,
    TokenIssuanceState
} from '../types';
import {
    resetState,
    statusFromToken
} from './utils';
export const combineReducers = (...reducers) => (state, action) => reducers.reduce((newState, reducer) => reducer(newState, action), state);
export const reducer = (state, action) => {
    var _a;
    const gatewayStatus = statusFromToken(state, state.gatewayToken) || GatewayStatus.UNKNOWN;
    const updatedState = Object.assign(Object.assign({}, state), {
        gatewayStatus
    });
    // eslint-disable-next-line no-prototype-builtins
    const tokenCreationInProgress = !!((_a = updatedState.civicPass.responsePayload) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(CivicPassMessageAction.ISSUANCE));
    logger.debug(`reducer.action: ${action.type}`, GatewayStatus[updatedState.gatewayStatus]);
    switch (action.type) {
        case 'startWalletPowo':
            {
                return Object.assign(Object.assign({}, updatedState), {
                    walletPowoInProgress: true
                });
            }
        case 'walletPowoComplete':
            {
                logger.debug('tokenCreationInProgress', {
                    tokenCreationInProgress
                });
                return Object.assign(Object.assign({}, updatedState), {
                    // only move to IN_REVIEW if it's during the initial token creation flow
                    gatewayStatus: tokenCreationInProgress ? GatewayStatus.IN_REVIEW : updatedState.gatewayStatus,
                    walletPowoInProgress: false,
                    firstTokenCheck: false
                });
            }
        case 'walletPowoIncomplete':
            {
                logger.debug('tokenCreationInProgress', {
                    tokenCreationInProgress
                });
                return Object.assign(Object.assign({}, state), {
                    renderIframe: false,
                    iframeMinimized: true,
                    powoFinished: false,
                    refreshTokenState: RefreshTokenState.IN_PROGRESS
                });
            }
        case 'tokenChange':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: statusFromToken(state, action.token),
                powoFinished: false,
                gatewayToken: action.token,
                tokenIssuanceState: TokenIssuanceState.COMPLETED
            });
        case 'powoComplete':
            return Object.assign(Object.assign({}, updatedState), {
                gatewayStatus: GatewayStatus.PROOF_OF_WALLET_OWNERSHIP,
                powoFinished: true,
                powoRequested: undefined,
                refreshIntervalId: undefined,
                refreshTokenState: state.refreshTokenState === RefreshTokenState.IN_PROGRESS ?
                    RefreshTokenState.REQUIRES_POWO :
                    state.refreshTokenState
            });
        case 'walletDisconnected':
            return resetState(state);
        case 'requestGatekeeperIssuance':
            return Object.assign(Object.assign({}, updatedState), {
                powoFinished: false,
                walletPowoInProgress: false,
                tokenIssuanceState: TokenIssuanceState.IN_PROGRESS
            });
        case 'requestGatekeeperIssuanceComplete':
            return Object.assign(Object.assign({}, updatedState), {
                tokenIssuanceState: TokenIssuanceState.COMPLETED
            });
        case 'requestGatekeeperIssuanceFailed':
            return Object.assign(Object.assign({}, resetState(state)), {
                gatewayStatus: GatewayStatus.ERROR,
                tokenIssuanceState: TokenIssuanceState.FAILED
            });
        case 'refreshAttemptDone':
            return Object.assign(Object.assign({}, updatedState), {
                refreshInProgress: false
            });
        case 'updateStateWithProps':
            return Object.assign(Object.assign({}, state), {
                stage: action.stage,
                walletAddress: action.walletAddress,
                redirectUrl: action.redirectUrl,
                gatekeeperNetworkAddress: action.gatekeeperNetworkAddress
            });
        case 'gatekeeperError':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.ERROR
            });
        case 'gatekeeperNetworkChanged':
            return Object.assign(Object.assign({}, resetState(state)), {
                gatekeeperNetworkAddress: action.gatekeeperNetworkAddress,
                walletAddress: state.walletAddress
            });
        default:
            return state;
    }
};