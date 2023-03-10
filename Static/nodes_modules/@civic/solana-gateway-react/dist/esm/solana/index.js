import React from 'react';
import {
    clusterEndpoint
} from './config';
import {
    GatewayProvider
} from '../gateway/GatewayContext';
import {
    chainImplementation
} from './chainImplementation';
import logger from '../logger';
// eslint-disable-next-line import/prefer-default-export
export const SolanaGatewayProvider = ({
    children = null,
    wallet,
    clusterUrl = clusterEndpoint('mainnet-beta'),
    gatekeeperNetwork,
    wrapper,
    logo,
    stage = 'prod',
    redirectUrl,
    options = {
        autoShowModal: true
    },
}) => {
    if (wallet && wallet.publicKey && gatekeeperNetwork) {
        const {
            publicKey,
            signTransaction
        } = wallet;
        const chainImpl = chainImplementation({
            clusterUrl,
            publicKey,
            signTransaction,
            gatekeeperNetworkAddress: gatekeeperNetwork,
            stage,
        });
        const providerWallet = {
            publicKey: publicKey.toBase58(),
        };
        logger.info('Client Options', options);
        return (React.createElement(GatewayProvider, {
            wallet: providerWallet,
            stage: stage,
            chainImplementation: chainImpl,
            gatekeeperNetwork: gatekeeperNetwork === null || gatekeeperNetwork === void 0 ? void 0 : gatekeeperNetwork.toBase58(),
            wrapper: wrapper,
            logo: logo,
            redirectUrl: redirectUrl,
            options: options
        }, children));
    }
    return React.createElement(React.Fragment, null, children);
};
export {
    useSolanaGateway
}
from './chainImplementation';
export * from './types';