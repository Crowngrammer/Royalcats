import {
    useCallback
} from 'react';
import logger from '../logger';
const useUserInteraction = ({
    wallet
}, state, dispatch) => {
    const {
        refreshIntervalId
    } = state;
    /**
     * handle the user initiating an issuance request
     */
    const requestGatewayToken = useCallback(async () => {
        logger.debug('requestGatewayToken called');
        if (!wallet || !wallet.publicKey) {
            logger.error('No wallet connected');
            return;
        }
        // We should stop polling when showing a modal dialog
        // and restart the polling when the user taps ok
        // or cancel
        if (refreshIntervalId) {
            dispatch({
                type: 'refresh_clear_interval'
            });
            clearInterval(refreshIntervalId);
        }
        dispatch({
            type: 'userInteraction_check_gatewayToken_status',
            token: state.gatewayToken
        });
    }, [refreshIntervalId, state.gatewayToken]);
    return {
        requestGatewayToken,
    };
};
export default useUserInteraction;