import {
    reducer as appReducer,
    combineReducers
} from './reducer';
import {
    reducer as useGatekeeperRecordReducer
} from '../useHooks/useGatekeeperRecord';
import {
    reducer as useCivicPass
} from '../useHooks/useCivicPass';
import {
    reducer as useChainReducer
} from '../useHooks/useChain';
import {
    reducer as useRefreshReducer
} from '../useHooks/useRefresh';
const reducer = combineReducers(useCivicPass, appReducer, useGatekeeperRecordReducer, useChainReducer, useRefreshReducer);
export default reducer;