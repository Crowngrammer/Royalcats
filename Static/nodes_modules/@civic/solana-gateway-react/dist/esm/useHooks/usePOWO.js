import {
    useCallback
} from 'react';
import logger from '../logger';
import useWalletHooks from './useWalletHooks';
const usePowo = ({
    wallet,
    chainImplementation
}, state, dispatch) => {
    const {
        powoFinished,
        walletPowoInProgress,
        refreshInProgress
    } = state;
    const {
        expectWalletConnected
    } = useWalletHooks(wallet, state, dispatch);
    /**
     * wait until the user has confirmed they want to continue the proof of wallet ownership flow
     * then resolve the promise
     */
    const waitForConfirmPOWO = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        async (payload) => {
            logger.debug('usePowo waitForConfirmPOWO before expectWalletConnected', {
                payload,
            });
            expectWalletConnected();
            return new Promise((resolve) => {
                logger.debug('usePowo waitForConfirmPOWO', {
                    powoFinished
                });
                if (powoFinished) {
                    resolve(payload);
                }
            });
        }, [powoFinished, expectWalletConnected]);
    /**
     * wait until the user has provided proof of wallet ownership using their connected wallet
     * if this was triggered from the refresh flow, dispatch events to indicate progress
     * if not, resolve a promise when the proof is ready
     */
    const waitForPOWO = useCallback(async (
        // eslint-disable-next-line @typescript-eslint/no-shadow
        payload) => {
        logger.debug('usePowo waitForPOWO before expectWalletConnected');
        const connectedWallet = expectWalletConnected();
        if (connectedWallet) {
            logger.debug('usePowo waitForPOWO', {
                payload,
                publicKey: connectedWallet.publicKey,
            });
            return new Promise((resolve) => {
                logger.debug('usePowo waitForPOWO walletPowoInProgress', {
                    walletPowoInProgress,
                    refreshInProgress,
                });
                chainImplementation
                    .proveWalletOwnership()
                    .then((proof) => {
                        resolve({
                            proof,
                            payload
                        });
                        dispatch({
                            type: 'walletPowoComplete'
                        });
                        dispatch({
                            type: 'civicPass_check_token_status'
                        });
                    })
                    .catch((error) => {
                        logger.error('Proof of wallet ownership error: ', error);
                        dispatch({
                            type: 'walletPowoIncomplete'
                        });
                    });
            });
        }
        return {
            proof: null
        };
    }, [expectWalletConnected, walletPowoInProgress, chainImplementation]);
    return {
        waitForConfirmPOWO,
        waitForPOWO,
    };
};
export default usePowo;