export var State;
(function(State) {
    State["ACTIVE"] = "ACTIVE";
    State["REVOKED"] = "REVOKED";
    State["FROZEN"] = "FROZEN";
})(State || (State = {}));
export var TokenState;
(function(TokenState) {
    TokenState["REQUESTED"] = "REQUESTED";
    TokenState["ACTIVE"] = "ACTIVE";
    TokenState["REVOKED"] = "REVOKED";
    TokenState["FROZEN"] = "FROZEN";
    TokenState["REJECTED"] = "REJECTED";
})(TokenState || (TokenState = {}));
export var GatekeeperRecordState;
(function(GatekeeperRecordState) {
    GatekeeperRecordState[GatekeeperRecordState["REQUESTING"] = 0] = "REQUESTING";
    GatekeeperRecordState[GatekeeperRecordState["NOT_REQUESTED"] = 404] = "NOT_REQUESTED";
    GatekeeperRecordState[GatekeeperRecordState["REQUESTED"] = 202] = "REQUESTED";
    GatekeeperRecordState[GatekeeperRecordState["ISSUED"] = 200] = "ISSUED";
    GatekeeperRecordState[GatekeeperRecordState["ISSUED_EXPIRY_APPROACHING"] = 205] = "ISSUED_EXPIRY_APPROACHING";
    GatekeeperRecordState[GatekeeperRecordState["ISSUED_EXPIRED"] = 426] = "ISSUED_EXPIRED";
    GatekeeperRecordState[GatekeeperRecordState["LOCATION_NOT_SUPPORTED"] = 401] = "LOCATION_NOT_SUPPORTED";
    GatekeeperRecordState[GatekeeperRecordState["ISSUED_LOCATION_NOT_SUPPORTED"] = 412] = "ISSUED_LOCATION_NOT_SUPPORTED";
    GatekeeperRecordState[GatekeeperRecordState["SERVER_FAILURE"] = 500] = "SERVER_FAILURE";
})(GatekeeperRecordState || (GatekeeperRecordState = {}));
export var GatewayStatus;
(function(GatewayStatus) {
    GatewayStatus[GatewayStatus["UNKNOWN"] = 0] = "UNKNOWN";
    GatewayStatus[GatewayStatus["CHECKING"] = 1] = "CHECKING";
    GatewayStatus[GatewayStatus["NOT_REQUESTED"] = 2] = "NOT_REQUESTED";
    GatewayStatus[GatewayStatus["COLLECTING_USER_INFORMATION"] = 3] = "COLLECTING_USER_INFORMATION";
    GatewayStatus[GatewayStatus["PROOF_OF_WALLET_OWNERSHIP"] = 4] = "PROOF_OF_WALLET_OWNERSHIP";
    GatewayStatus[GatewayStatus["IN_REVIEW"] = 5] = "IN_REVIEW";
    GatewayStatus[GatewayStatus["FAILED"] = 6] = "FAILED";
    GatewayStatus[GatewayStatus["REJECTED"] = 7] = "REJECTED";
    GatewayStatus[GatewayStatus["REVOKED"] = 8] = "REVOKED";
    GatewayStatus[GatewayStatus["FROZEN"] = 9] = "FROZEN";
    GatewayStatus[GatewayStatus["ACTIVE"] = 10] = "ACTIVE";
    GatewayStatus[GatewayStatus["ERROR"] = 11] = "ERROR";
    GatewayStatus[GatewayStatus["LOCATION_NOT_SUPPORTED"] = 12] = "LOCATION_NOT_SUPPORTED";
    GatewayStatus[GatewayStatus["REFRESH_TOKEN_REQUIRED"] = 13] = "REFRESH_TOKEN_REQUIRED";
})(GatewayStatus || (GatewayStatus = {}));
export var TokenIssuanceState;
(function(TokenIssuanceState) {
    TokenIssuanceState[TokenIssuanceState["NOT_REQUESTED"] = 0] = "NOT_REQUESTED";
    TokenIssuanceState[TokenIssuanceState["IN_PROGRESS"] = 1] = "IN_PROGRESS";
    TokenIssuanceState[TokenIssuanceState["COMPLETED"] = 2] = "COMPLETED";
    TokenIssuanceState[TokenIssuanceState["FAILED"] = 3] = "FAILED";
})(TokenIssuanceState || (TokenIssuanceState = {}));
export var CivicPassIssuanceStatus;
(function(CivicPassIssuanceStatus) {
    CivicPassIssuanceStatus[CivicPassIssuanceStatus["NOT_REQUESTED"] = 0] = "NOT_REQUESTED";
    CivicPassIssuanceStatus[CivicPassIssuanceStatus["REQUESTED"] = 1] = "REQUESTED";
    CivicPassIssuanceStatus[CivicPassIssuanceStatus["VERIFIED"] = 2] = "VERIFIED";
    CivicPassIssuanceStatus[CivicPassIssuanceStatus["FAILED"] = 3] = "FAILED";
})(CivicPassIssuanceStatus || (CivicPassIssuanceStatus = {}));
export var RefreshTokenState;
(function(RefreshTokenState) {
    RefreshTokenState[RefreshTokenState["NOT_REQUIRED"] = 0] = "NOT_REQUIRED";
    RefreshTokenState[RefreshTokenState["CHECK_TOKEN_EXPIRATION"] = 1] = "CHECK_TOKEN_EXPIRATION";
    RefreshTokenState[RefreshTokenState["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    RefreshTokenState[RefreshTokenState["REQUIRES_POWO"] = 3] = "REQUIRES_POWO";
    RefreshTokenState[RefreshTokenState["COMPLETED"] = 4] = "COMPLETED";
    RefreshTokenState[RefreshTokenState["CANCELLED"] = 5] = "CANCELLED";
    RefreshTokenState[RefreshTokenState["FAILED"] = 6] = "FAILED";
})(RefreshTokenState || (RefreshTokenState = {}));
export var ChainType;
(function(ChainType) {
    ChainType["SOLANA"] = "solana";
    ChainType["ETHEREUM"] = "ethereum";
    ChainType["CASPER"] = "casper";
})(ChainType || (ChainType = {}));
export var CivicPassMessageEventResult;
(function(CivicPassMessageEventResult) {
    CivicPassMessageEventResult["SUCCESS"] = "success";
    CivicPassMessageEventResult["FAILURE"] = "failure";
    CivicPassMessageEventResult["CANCELLED"] = "cancelled";
    CivicPassMessageEventResult["IN_PROGRESS"] = "inProgress";
})(CivicPassMessageEventResult || (CivicPassMessageEventResult = {}));
export var CivicPassMessageAction;
(function(CivicPassMessageAction) {
    CivicPassMessageAction["ISSUANCE"] = "issuance";
    CivicPassMessageAction["CONFIRM_TRANSACTION"] = "confirmTransaction";
    CivicPassMessageAction["TOKEN_FROZEN"] = "tokenFrozen";
    CivicPassMessageAction["TOKEN_ACTIVE"] = "tokenActive";
    CivicPassMessageAction["TOKEN_REVOKED"] = "tokenRevoked";
    CivicPassMessageAction["TOKEN_REJECTED"] = "tokenRejected";
    CivicPassMessageAction["TOKEN_IN_REVIEW"] = "tokenInReview";
    CivicPassMessageAction["FAILED_IP_CHECK"] = "failedIpCheck";
    CivicPassMessageAction["REFRESH"] = "refresh";
    CivicPassMessageAction["PROOF_OF_WALLET_OWNERSHIP"] = "proofOfWalletOwnership";
})(CivicPassMessageAction || (CivicPassMessageAction = {}));