/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
    DEFAULT_LOG_LEVEL,
    LoggingProvider
} from './provider.logger';
const consoleWithOptionalObject = (method, message, object) => {
    if (object) {
        method(message, object);
    } else {
        method(message);
    }
};
class LogLocal extends LoggingProvider {
    constructor(logLevel = DEFAULT_LOG_LEVEL) {
        super(console, logLevel);
    }
    debug(message, object) {
        consoleWithOptionalObject(this.logger.debug, message, object);
    }
    info(message, object) {
        consoleWithOptionalObject(this.logger.info, message, object);
    }
    warn(message, object) {
        consoleWithOptionalObject(this.logger.warn, message, object);
    }
    error(message, exception) {
        consoleWithOptionalObject(this.logger.error, message, exception);
    }
}
export default LogLocal;