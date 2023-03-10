import {
    findGatewayTokens,
    onGatewayTokenChange,
    removeAccountChangeListener
} from '@identity.com/solana-gateway-ts';
import {
    Connection,
    PublicKey
} from '@solana/web3.js';
import {
    prove
} from '@identity.com/prove-solana-wallet';
import {
    getGatekeeperEndpoint,
    makeConfig,
    urlToCluster
} from './config';
import {
    ChainType,
    State
} from '../types';
import {
    useGateway
} from '../gateway/GatewayContext';
import logger from '../logger';
// eslint-disable-next-line import/prefer-default-export
export const chainImplementation = ({
    clusterUrl,
    publicKey,
    signTransaction,
    gatekeeperNetworkAddress,
    stage,
}) => {
    logger.debug('Connecting to cluster with commitment recent', clusterUrl);
    const connection = new Connection(clusterUrl, 'processed');
    return {
        addOnGatewayTokenChangeListener: (gatewayToken, tokenDidChange) => {
            return onGatewayTokenChange(connection, new PublicKey(gatewayToken.identifier), (token) => {
                tokenDidChange({
                    issuingGatekeeper: token.issuingGatekeeper.toBase58(),
                    gatekeeperNetworkAddress: token.gatekeeperNetwork.toBase58(),
                    owner: token.owner.toBase58(),
                    state: State[token.state],
                    identifier: token.publicKey.toBase58(),
                    expiryTime: token.expiryTime,
                });
            });
        },
        removeOnGatewayTokenChangeListener: (listenerId) => {
            removeAccountChangeListener(connection, listenerId);
        },
        findGatewayToken: async () => {
            const [onChainToken] = (await findGatewayTokens(connection, publicKey, new PublicKey(gatekeeperNetworkAddress), true)) || [];
            if (!onChainToken)
                return undefined;
            return {
                issuingGatekeeper: onChainToken.issuingGatekeeper.toBase58(),
                gatekeeperNetworkAddress: onChainToken.gatekeeperNetwork.toBase58(),
                owner: onChainToken.owner.toBase58(),
                state: State[onChainToken.state],
                identifier: onChainToken.publicKey.toBase58(),
                expiryTime: onChainToken.expiryTime,
            };
        },
        proveWalletOwnership: async () => {
            const result = await prove(publicKey, signTransaction, makeConfig(clusterUrl));
            return result.toString('base64');
        },
        chainType: ChainType.SOLANA,
        httpConfig: {
            baseUrl: getGatekeeperEndpoint(stage),
            queryParams: {
                network: urlToCluster(clusterUrl)
            },
        },
    };
};
export const useSolanaGateway = () => {
    const {
        gatewayToken
    } = useGateway();
    const solanaGatewayToken = gatewayToken ?
        {
            issuingGatekeeper: new PublicKey(gatewayToken.issuingGatekeeper),
            gatekeeperNetworkAddress: new PublicKey(gatewayToken.gatekeeperNetworkAddress),
            owner: new PublicKey(gatewayToken.owner),
            state: gatewayToken.state,
            publicKey: new PublicKey(gatewayToken.identifier),
            expiryTime: gatewayToken.expiryTime,
        } :
        undefined;
    return Object.assign(Object.assign({}, useGateway()), {
        gatewayToken: solanaGatewayToken
    });
};