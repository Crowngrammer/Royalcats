import React, {
    useContext,
    useEffect,
    useMemo
} from 'react';
import {
    Keypair,
    Connection
} from '@solana/web3.js';
import * as R from 'ramda';
import logger from '../logger';
const ConnectionContext = React.createContext(null);
export const getSolanaConnection = R.memoizeWith(R.identity, (clusterUrl) => {
    logger.debug('new solana connection created using clusterUrl', clusterUrl);
    return new Connection(clusterUrl, 'processed');
});
export function SolanaConnectionProvider({
    children = null,
    endpoint,
}) {
    const connection = useMemo(() => getSolanaConnection(endpoint), [endpoint]);
    // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
    // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
    // This is a hack to prevent the list from ever getting empty
    useEffect(() => {
        const id = connection.onAccountChange(Keypair.generate().publicKey, () => {});
        return () => {
            connection.removeAccountChangeListener(id);
        };
    }, [connection]);
    useEffect(() => {
        const id = connection.onSlotChange(() => null);
        return () => {
            connection.removeSlotChangeListener(id);
        };
    }, [connection]);
    return (React.createElement(ConnectionContext.Provider, {
        value: {
            endpoint,
            connection,
        }
    }, children));
}
export function useConnection() {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error('Missing connection context');
    }
    return context.connection;
}