import {
    useEffect
} from 'react';
import logger from '../logger';
import {
    CivicPassIssuanceStatus,
    CivicPassMessageAction,
    CivicPassMessageEventResult,
    GatekeeperRecordState,
    GatewayStatus,
    RefreshTokenState,
} from '../types';
import {
    getCivicPassEndpoint
} from '../config';
import {
    resetState,
    statusFromToken
} from '../useReducer/utils';
const gatewayStatusToCivicPassAction = {
    [GatewayStatus.PROOF_OF_WALLET_OWNERSHIP]: CivicPassMessageAction.PROOF_OF_WALLET_OWNERSHIP,
    [GatewayStatus.NOT_REQUESTED]: CivicPassMessageAction.ISSUANCE,
    [GatewayStatus.IN_REVIEW]: CivicPassMessageAction.TOKEN_IN_REVIEW,
    [GatewayStatus.ERROR]: CivicPassMessageAction.ISSUANCE,
    [GatewayStatus.ACTIVE]: CivicPassMessageAction.TOKEN_ACTIVE,
    [GatewayStatus.REVOKED]: CivicPassMessageAction.TOKEN_REVOKED,
    [GatewayStatus.FROZEN]: CivicPassMessageAction.TOKEN_FROZEN,
    [GatewayStatus.REJECTED]: CivicPassMessageAction.TOKEN_REJECTED,
    [GatewayStatus.LOCATION_NOT_SUPPORTED]: CivicPassMessageAction.FAILED_IP_CHECK,
    [GatewayStatus.REFRESH_TOKEN_REQUIRED]: CivicPassMessageAction.REFRESH,
};
const logDebug = (message, obj = null) => logger.debug(`[useCivicPass] ${message}`, obj);
const logError = (message, obj = null) => logger.error(`[useCivicPass] ${message}`, obj);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getCivicPassSrcUrl = (state, status) => {
    const {
        redirectUrl,
        gatekeeperNetworkAddress,
        stage,
        walletAddress,
        civicPass,
        chainType
    } = state;
    if (!gatekeeperNetworkAddress || !walletAddress) {
        logError('Required properties not present', {
            gatekeeperNetworkAddress,
            walletAddress
        });
        throw new Error(`Required properties not present ${{ gatekeeperNetworkAddress, walletAddress }}`);
    }
    const civicPassSrcUrl = getCivicPassEndpoint(stage);
    const url = new URL(civicPassSrcUrl);
    const action = gatewayStatusToCivicPassAction[status];
    const searchParams = new URLSearchParams(Object.assign(Object.assign({}, civicPass.requestPayload), {
        redirectUrl,
        networkAddress: gatekeeperNetworkAddress,
        action,
        wallet: walletAddress,
        chain: chainType
    }));
    logDebug('Civic pass query params', {
        searchParams: searchParams.toString(),
        gatewayStatus: GatewayStatus[status]
    });
    return `${url.href}?${searchParams.toString()}`;
};
export const reducer = (state, action) => {
    var _a;
    switch (action.type) {
        case 'civicPass_check_token_status':
            {
                return Object.assign(Object.assign({}, state), {
                    tokenRequested: true,
                    iframeMinimized: !((_a = state.options) === null || _a === void 0 ? void 0 : _a.autoShowModal),
                    renderIframe: true,
                    iframeSrcUrl: state.civicPass.status === CivicPassIssuanceStatus.REQUESTED ?
                        state.iframeSrcUrl :
                        getCivicPassSrcUrl(state, statusFromToken(state, action.token))
                });
            }
        case 'userInteraction_check_gatewayToken_status':
            {
                return Object.assign(Object.assign({}, state), {
                    tokenRequested: true,
                    iframeMinimized: false,
                    renderIframe: true,
                    iframeSrcUrl: state.civicPass.status === CivicPassIssuanceStatus.REQUESTED ?
                        state.iframeSrcUrl :
                        getCivicPassSrcUrl(state, statusFromToken(state, action.token))
                });
            }
        case 'civicPass_close':
            return Object.assign({}, (state.civicPass.status === CivicPassIssuanceStatus.REQUESTED ?
                Object.assign(Object.assign({}, state), {
                    iframeMinimized: true,
                    renderIframe: true
                }) : Object.assign(Object.assign({}, state), {
                    iframeMinimized: true,
                    renderIframe: false
                })));
        case 'civicPass_in_progress':
            {
                return Object.assign(Object.assign({}, state), {
                    gatewayStatus: GatewayStatus.COLLECTING_USER_INFORMATION,
                    renderIframe: true,
                    iframeMinimized: false,
                    civicPass: Object.assign(Object.assign({}, state.civicPass), {
                        status: CivicPassIssuanceStatus.REQUESTED
                    })
                });
            }
        case 'civicPass_issuance_success':
            {
                const {
                    payload,
                    requiresProofOfWalletOwnership
                } = action.payload;
                const gatewayStatus = requiresProofOfWalletOwnership ?
                    GatewayStatus.PROOF_OF_WALLET_OWNERSHIP :
                    GatewayStatus.IN_REVIEW;
                return Object.assign(Object.assign({}, state), {
                    gatewayStatus,
                    renderIframe: true,
                    iframeMinimized: false,
                    powoRequested: 'solana',
                    iframeSrcUrl: getCivicPassSrcUrl(state, gatewayStatus),
                    civicPass: Object.assign(Object.assign({}, state.civicPass), {
                        status: CivicPassIssuanceStatus.VERIFIED,
                        responsePayload: {
                            [CivicPassMessageAction.ISSUANCE]: {
                                payload,
                                requiresProofOfWalletOwnership,
                            },
                        }
                    })
                });
            }
        case 'civicPass_issuance_failure':
            return Object.assign(Object.assign({}, resetState(state)), {
                gatewayStatus: GatewayStatus.FAILED
            });
        case 'civicPass_issuance_cancelled':
            return Object.assign(Object.assign({}, resetState(state)), {
                gatewayStatus: GatewayStatus.NOT_REQUESTED
            });
        case 'civicPass_refresh_success':
            {
                const {
                    payload,
                    requiresProofOfWalletOwnership
                } = action.payload;
                const gatewayStatus = requiresProofOfWalletOwnership ?
                    GatewayStatus.PROOF_OF_WALLET_OWNERSHIP :
                    GatewayStatus.IN_REVIEW;
                return Object.assign(Object.assign({}, state), {
                    gatewayStatus,
                    renderIframe: true,
                    iframeMinimized: false,
                    iframeSrcUrl: getCivicPassSrcUrl(state, gatewayStatus),
                    refreshTokenState: RefreshTokenState.IN_PROGRESS,
                    civicPass: Object.assign(Object.assign({}, state.civicPass), {
                        responsePayload: {
                            [CivicPassMessageAction.REFRESH]: {
                                payload,
                                requiresProofOfWalletOwnership,
                            },
                        }
                    })
                });
            }
        case 'civicPass_refresh_cancelled':
            return Object.assign(Object.assign({}, resetState(state)), {
                refreshTokenState: RefreshTokenState.CANCELLED,
                gatewayStatus: GatewayStatus.REFRESH_TOKEN_REQUIRED
            });
        case 'civicPass_refresh_failure':
            return Object.assign(Object.assign({}, resetState(state)), {
                refreshTokenState: RefreshTokenState.FAILED,
                gatewayStatus: GatewayStatus.FAILED
            });
        case 'civicPass_location_not_supported':
            return Object.assign(Object.assign({}, state), {
                iframeMinimized: true,
                renderIframe: false,
                gatewayStatus: state.gatewayStatus,
                refreshTokenState: state.gatekeeperRecordState === GatekeeperRecordState.ISSUED_LOCATION_NOT_SUPPORTED ?
                    RefreshTokenState.REQUIRES_POWO :
                    state.refreshTokenState
            });
        default:
            return state;
    }
};
const useCivicPass = ({
    wallet
}, state, dispatch) => {
    const {
        gatekeeperRecordState
    } = state;
    const getActionForIssuanceResponse = (response) => {
        const actions = {
            [CivicPassMessageEventResult.SUCCESS]: {
                type: 'civicPass_issuance_success',
                payload: Object.assign(Object.assign({}, response), {
                    requiresProofOfWalletOwnership: true
                }),
            },
            [CivicPassMessageEventResult.FAILURE]: {
                type: 'civicPass_issuance_failure',
            },
            [CivicPassMessageEventResult.CANCELLED]: {
                type: 'civicPass_issuance_cancelled',
            },
            [CivicPassMessageEventResult.IN_PROGRESS]: {
                type: 'civicPass_in_progress',
            },
        };
        return actions[response.event];
    };
    const getActionForRefreshResponse = (response) => {
        const actions = {
            [CivicPassMessageEventResult.SUCCESS]: {
                type: 'civicPass_refresh_success',
                payload: response,
            },
            [CivicPassMessageEventResult.CANCELLED]: {
                type: 'civicPass_refresh_cancelled',
            },
            [CivicPassMessageEventResult.FAILURE]: {
                type: 'civicPass_refresh_failure',
            },
        };
        return actions[response.event];
    };
    const getActionForPowoResponse = (response) => {
        const actions = {
            [CivicPassMessageEventResult.SUCCESS]: {
                type: 'powoComplete',
            },
        };
        return actions[response.event];
    };
    const getActionForLocationNotSupportedResponse = (response) => {
        const actions = {
            [CivicPassMessageEventResult.SUCCESS]: {
                type: 'civicPass_location_not_supported',
            },
        };
        return actions[response.event];
    };
    const getActionForStaticResponse = (response) => {
        const actions = {
            [CivicPassMessageEventResult.SUCCESS]: {
                type: 'civicPass_close',
            },
        };
        return actions[response.event];
    };
    const dispatchComplianceEventResult = (response) => {
        const actions = {
            [CivicPassMessageAction.ISSUANCE]: getActionForIssuanceResponse(response),
            [CivicPassMessageAction.PROOF_OF_WALLET_OWNERSHIP]: getActionForPowoResponse(response),
            [CivicPassMessageAction.TOKEN_IN_REVIEW]: getActionForStaticResponse(response),
            [CivicPassMessageAction.TOKEN_ACTIVE]: getActionForStaticResponse(response),
            [CivicPassMessageAction.TOKEN_FROZEN]: getActionForStaticResponse(response),
            [CivicPassMessageAction.TOKEN_REJECTED]: getActionForStaticResponse(response),
            [CivicPassMessageAction.TOKEN_REVOKED]: getActionForStaticResponse(response),
            [CivicPassMessageAction.FAILED_IP_CHECK]: getActionForLocationNotSupportedResponse(response),
            [CivicPassMessageAction.REFRESH]: getActionForRefreshResponse(response),
        };
        const action = actions[response.action];
        if (action) {
            logDebug('Successfully processed compliance event with action', action);
            dispatch(action);
        }
    };
    /**
     * Listen for post messages from the compliance iframe and dispatch events
     * based on the event type
     */
    useEffect(() => {
        if (wallet && wallet.publicKey) {
            logDebug('Current state', state);
            const handler = async (response) => {
                dispatchComplianceEventResult(response.data);
            };
            window.addEventListener('message', handler);
            return () => {
                logDebug('Removing event listener for compliance');
                return window.removeEventListener('message', handler);
            };
        }
        return () => {};
    }, []);
    /**
     * We do not have a token and user is connecting from an unsupported country,
     * so we show the country not supported screen
     */
    useEffect(() => {
        if (gatekeeperRecordState === GatekeeperRecordState.LOCATION_NOT_SUPPORTED) {
            dispatch({
                type: 'civicPass_check_token_status'
            });
        }
    }, [gatekeeperRecordState]);
    return {
        dispatchComplianceEventResult
    };
};
export default useCivicPass;