import LogLocal from './local.logger';
import {
    LoggingProvider
} from './provider.logger';
const localLogger = new LoggingProvider(new LogLocal());
export default localLogger;