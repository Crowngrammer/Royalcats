import {
    useEffect,
    useRef
} from 'react';
import * as R from 'ramda';
import {
    GatekeeperRecordState,
    GatewayStatus
} from '../types';
import logger from '../logger';
import useWalletHooks from './useWalletHooks';
export const reducer = (state, action) => {
    switch (action.type) {
        case 'getGatekeeperRecord':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.CHECKING,
                gatekeeperRecordState: undefined
            });
        case 'getGatekeeperRecord_failure':
            return Object.assign(Object.assign({}, state), {
                gatekeeperRecordState: action.gatekeeperRecord.state
            });
        case 'getGatekeeperRecord_success':
            return Object.assign(Object.assign({}, state), {
                gatekeeperRecordState: action.gatekeeperRecord.state,
                civicPass: Object.assign(Object.assign({}, state.civicPass), {
                    requestPayload: action.gatekeeperRecord.payload
                })
            });
        case 'getGatekeeperRecord_location_not_supported':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.LOCATION_NOT_SUPPORTED,
                gatekeeperRecordState: action.gatekeeperRecord.state,
                civicPass: Object.assign(Object.assign({}, state.civicPass), {
                    requestPayload: action.gatekeeperRecord.payload
                })
            });
        case 'getGatekeeperRecord_issued_location_not_supported':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.LOCATION_NOT_SUPPORTED,
                gatekeeperRecordState: action.gatekeeperRecord.state,
                civicPass: Object.assign(Object.assign({}, state.civicPass), {
                    requestPayload: action.gatekeeperRecord.payload
                })
            });
        case 'getGatekeeperRecord_not_found':
            return Object.assign(Object.assign({}, state), {
                gatewayStatus: GatewayStatus.NOT_REQUESTED,
                gatekeeperRecordState: action.gatekeeperRecord.state
            });
        default:
            return state;
    }
};
const useGetGatekeeperRecord = ({
    wallet,
    gatekeeperClient,
    httpConfig,
}, state, dispatch) => {
    const {
        expectWalletConnected
    } = useWalletHooks(wallet, state, dispatch);
    const logDebug = (message, obj = null) => logger.debug(`[useGetGatekeeperRecord] ${message}`, obj);
    const {
        gatewayToken,
        gatekeeperNetworkAddress
    } = state;
    const dispatchFetch = () => ({
        type: 'getGatekeeperRecord',
    });
    const dispatchFailure = () => ({
        type: 'getGatekeeperRecord_failure',
        gatekeeperRecord: {
            state: GatekeeperRecordState.SERVER_FAILURE,
            payload: undefined
        },
    });
    const dispatchSuccess = (record) => ({
        type: 'getGatekeeperRecord_success',
        gatekeeperRecord: record,
    });
    const dispatchLocationNotSupported = (record) => ({
        type: 'getGatekeeperRecord_location_not_supported',
        gatekeeperRecord: record,
    });
    const dispatchIssuedLocationNotSupported = (record) => ({
        type: 'getGatekeeperRecord_issued_location_not_supported',
        gatekeeperRecord: record,
    });
    const dispatchRecordNotFound = (record) => ({
        type: 'getGatekeeperRecord_not_found',
        gatekeeperRecord: record,
    });
    const getAction = (gatekeeperRecordState) => {
        const actions = {
            [GatekeeperRecordState.REQUESTED]: () => dispatchSuccess(gatekeeperRecordState),
            [GatekeeperRecordState.ISSUED]: () => dispatchSuccess(gatekeeperRecordState),
            [GatekeeperRecordState.ISSUED_EXPIRED]: () => dispatchSuccess(gatekeeperRecordState),
            [GatekeeperRecordState.ISSUED_EXPIRY_APPROACHING]: () => dispatchSuccess(gatekeeperRecordState),
            [GatekeeperRecordState.ISSUED_LOCATION_NOT_SUPPORTED]: () => dispatchIssuedLocationNotSupported(gatekeeperRecordState),
            [GatekeeperRecordState.LOCATION_NOT_SUPPORTED]: () => dispatchLocationNotSupported(gatekeeperRecordState),
            [GatekeeperRecordState.NOT_REQUESTED]: () => dispatchRecordNotFound(gatekeeperRecordState),
        };
        return actions[gatekeeperRecordState.state];
    };
    /**
     * Check to see if there is getGatekeeperRecord and dispatch actions based on the state of the record.
     * If the service call fails dispatch a failure.
     */
    const dispatchGatekeeperRecord = async () => {
        const walletAddress = expectWalletConnected();
        logDebug('Fetching Gatekeeper record');
        dispatch(dispatchFetch());
        try {
            const record = await gatekeeperClient().getGatekeeperRecordWithPayload(walletAddress.publicKey);
            logDebug('Gatekeeper record response state: ', GatekeeperRecordState[record.state]);
            const action = getAction(record);
            if (!action) {
                logger.error('Cannot dispatch action for invalid Gatekeeper Record State.', {
                    record
                });
                return;
            }
            dispatch(action());
        } catch (error) {
            logger.error('Failed to fetch Gatekeeper record', error);
            dispatch(dispatchFailure());
            throw error;
        }
    };
    const useHttpConfigRef = (newHttpConfig) => {
        const ref = useRef();
        // We have to perform a deep equality check, otherwise useEffect will run every time the httpConfig object reference changes.
        if (!R.equals(newHttpConfig, ref.current)) {
            ref.current = newHttpConfig;
        }
        return ref.current;
    };
    useEffect(() => {
        if (!wallet || !wallet.publicKey)
            return;
        dispatchGatekeeperRecord();
    }, [gatewayToken === null || gatewayToken === void 0 ? void 0 : gatewayToken.state, gatewayToken === null || gatewayToken === void 0 ? void 0 : gatewayToken.expiryTime, gatekeeperNetworkAddress, useHttpConfigRef(httpConfig)]);
    return {
        dispatchGatekeeperRecord
    };
};
export default useGetGatekeeperRecord;