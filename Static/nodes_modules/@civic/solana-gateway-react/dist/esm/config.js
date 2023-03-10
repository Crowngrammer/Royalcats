export const DEFAULT_CIVIC_COMPLIANCE_SRC_URL = 'https://pass-dev.civic.com/';
export const DEFAULT_GATEKEEPER_STAGE = 'prod';
// This is the regular refresh interval, not retry on errors:
export const DEFAULT_REFRESH_INTERVAL = 1000 * 60 * 60 * 6; // 6 hours
export const DEFAULT_API_NUM_RETRIES = 3;
export const COMPLIANCE_ENDPOINTS = {
    test: 'https://passv2-dev.civic.com',
    local: 'https://passv2-dev.civic.com',
    dev: 'https://passv2-dev.civic.com',
    preprod: 'https://passv2-preprod.civic.com',
    prod: 'https://passv2.civic.com',
};
export const getCivicPassEndpoint = (stage) => {
    const endpoint = COMPLIANCE_ENDPOINTS[stage];
    if (!endpoint) {
        throw new Error(`Invalid stage ${stage}`);
    }
    return endpoint;
};
export const REFRESH_INTERVAL = {
    test: 10000,
    local: 1000 * 60 * 1,
    dev: 1000 * 60 * 15, // 15 minutes
};
/*
 * Number of retries when an API call fails
 * This uses exponential backoff so we don't want too many retries
 * as it can spread out in time quite quickly.
 */
export const API_NUM_RETRIES = {
    test: 5,
    local: 5,
    dev: 5,
};
export const getRefreshIntervalMs = (stage) => REFRESH_INTERVAL[stage] || DEFAULT_REFRESH_INTERVAL;
export const getDefaultApiNumRetries = (stage) => API_NUM_RETRIES[stage] || DEFAULT_API_NUM_RETRIES;