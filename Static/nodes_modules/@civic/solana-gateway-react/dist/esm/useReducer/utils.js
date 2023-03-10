import {
    GatewayStatus,
    TokenIssuanceState,
    CivicPassIssuanceStatus,
    State,
    GatekeeperRecordState,
} from '../types';
// eslint-disable-next-line import/prefer-default-export
export const resetState = (state) => (Object.assign(Object.assign({}, state), {
    gatewayStatus: GatewayStatus.UNKNOWN,
    tokenRequested: false,
    iframeMinimized: false,
    firstTokenCheck: true,
    renderIframe: false,
    gatewayToken: undefined,
    powoRequested: undefined,
    refreshIntervalId: undefined,
    powoFinished: false,
    refreshInProgress: false,
    tokenIssuanceState: TokenIssuanceState.NOT_REQUESTED,
    walletToRefresh: undefined,
    walletPowoInProgress: false,
    gatekeeperRecordState: undefined,
    civicPass: {
        status: CivicPassIssuanceStatus.NOT_REQUESTED,
        iframeMinimized: false,
        renderIframe: false,
    }
}));
const hasExpired = (gatewayToken) => {
    const now = Math.floor(Date.now() / 1000);
    return !!gatewayToken.expiryTime && now >= gatewayToken.expiryTime;
};
const isLocationNotSupported = (recordState) => {
    if (!recordState)
        return false;
    return [GatekeeperRecordState.LOCATION_NOT_SUPPORTED].includes(recordState);
};
const isIssuedLocationNotSupported = (recordState) => {
    if (!recordState)
        return false;
    return [GatekeeperRecordState.ISSUED_LOCATION_NOT_SUPPORTED].includes(recordState);
};
export const statusFromToken = (state, gatewayToken) => {
    if (!gatewayToken)
        return state.gatewayStatus;
    switch (gatewayToken.state) {
        case State.ACTIVE:
            if (isLocationNotSupported(state.gatekeeperRecordState)) {
                return GatewayStatus.LOCATION_NOT_SUPPORTED;
            }
            if (isIssuedLocationNotSupported(state.gatekeeperRecordState)) {
                return GatewayStatus.REFRESH_TOKEN_REQUIRED;
            }
            if (state.gatewayStatus === GatewayStatus.PROOF_OF_WALLET_OWNERSHIP) {
                return GatewayStatus.PROOF_OF_WALLET_OWNERSHIP;
            }
            return hasExpired(gatewayToken) ? GatewayStatus.REFRESH_TOKEN_REQUIRED : GatewayStatus.ACTIVE;
        case State.REVOKED:
            return GatewayStatus.REVOKED;
        case State.FROZEN:
            return GatewayStatus.FROZEN;
        default:
            return GatewayStatus.UNKNOWN;
    }
};