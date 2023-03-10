import {
    useCallback,
    useEffect
} from 'react';
import logger from '../logger';
const useWallet = (wallet, {
    refreshIntervalId
}, dispatch) => {
    /**
     * detect a wallet disconnecting and dispatch an event
     */
    useEffect(() => {
        if (!wallet || !wallet.publicKey) {
            logger.debug('wallet disconnected');
            if (refreshIntervalId) {
                logger.debug('useEffect clearInterval', refreshIntervalId);
                clearInterval(refreshIntervalId);
                dispatch({
                    type: 'refresh_clear_interval'
                });
            }
            dispatch({
                type: 'walletDisconnected'
            });
        }
    }, [wallet, refreshIntervalId]);
    /**
     * expect a connected wallet, throw an error if a vald wallet isn't in state
     */
    const expectWalletConnected = useCallback(() => {
        logger.debug('expectWalletConnected', wallet);
        if (!wallet || !wallet.publicKey) {
            throw new Error('No wallet connnected');
        }
        return wallet;
    }, [wallet]);
    return {
        expectWalletConnected,
    };
};
export default useWallet;