const logLevels = ['debug', 'info', 'warn', 'error'];
export const allowLogging = (logLevel, atLeastlogLevel) => logLevels.indexOf(logLevel) <= logLevels.indexOf(atLeastlogLevel);
export const DEFAULT_LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || 'warn';
export class LoggingProvider {
    constructor(logger, logLevel = DEFAULT_LOG_LEVEL) {
        this.logger = logger;
        if (typeof window !== 'undefined') {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const urllogLevel = urlSearchParams.get('logLevel');
            this.logLevel = urllogLevel || logLevel;
        } else {
            this.logLevel = logLevel;
        }
    }
    debug(message, object) {
        if (allowLogging(this.logLevel, 'debug'))
            this.logger.debug(message, object);
    }
    info(message, object) {
        if (allowLogging(this.logLevel, 'info'))
            this.logger.info(message, object);
    }
    warn(message, object) {
        if (allowLogging(this.logLevel, 'warn'))
            this.logger.warn(message, object);
    }
    error(message, exception) {
        if (allowLogging(this.logLevel, 'error'))
            this.logger.error(message, exception);
    }
}