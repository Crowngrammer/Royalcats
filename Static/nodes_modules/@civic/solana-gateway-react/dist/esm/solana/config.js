import {
    clusterApiUrl
} from '@solana/web3.js';
export const clusterEndpoint = (cluster) => {
    switch (cluster) {
        case 'civicnet':
            return 'https://d3ab7dlfud2b5u.cloudfront.net';
        case 'localnet':
            return 'http://localhost:8899';
        default:
            return clusterApiUrl(cluster);
    }
};
// reverse lookup of cluster from url
// note - this is a "best-guess" heuristic. If the client passes an unrecognised
// url, default to mainnet
export const urlToCluster = (clusterUrl) => {
    const supportedClusters = ['devnet', 'testnet', 'mainnet-beta', 'civicnet', 'localnet'];
    const matchedUrlCluster = supportedClusters.find((cluster) => clusterEndpoint(cluster) === clusterUrl);
    if (matchedUrlCluster)
        return matchedUrlCluster;
    const matchedStringCluster = supportedClusters.find((cluster) => clusterUrl.indexOf(cluster) >= 0);
    if (matchedStringCluster)
        return matchedStringCluster;
    return 'mainnet-beta';
};
const solanaVersionedEndpoint = 'v1/token/solana';
export const GATEKEEPER_ENDPOINTS = {
    local: `http://localhost:3001/local/${solanaVersionedEndpoint}`,
    test: `http://localhost:3001/local/${solanaVersionedEndpoint}`,
    dev: `https://dev.api.civic.com/ociv-gatekeeper-dev/${solanaVersionedEndpoint}`,
    preprod: `https://dev.api.civic.com/ociv-gatekeeper-preprod/${solanaVersionedEndpoint}`,
    prod: `https://api.civic.com/ociv-gatekeeper/${solanaVersionedEndpoint}`,
};
export const getGatekeeperEndpoint = (stage) => {
    const endpoint = GATEKEEPER_ENDPOINTS[stage];
    if (!endpoint) {
        throw new Error(`Invalid stage ${stage}`);
    }
    return endpoint;
};
export const makeConfig = (clusterUrl) => {
    const cluster = urlToCluster(clusterUrl);
    return {
        cluster,
        commitment: 'confirmed',
        // this map instructs the POWO library to use clusterUrl
        // to connect to the solana network. This avoids rate limiting issues with using the default
        // public urls
        supportedClusterUrls: {
            [cluster]: clusterUrl,
        },
        recentBlockCheck: false,
    };
};