import logger from '../logger';
export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const pollUntilConditionMet = async (fnToRun, conditionChecker, interval = 2000, retries = 20) => {
    if (retries <= 0) {
        logger.debug('WaitForStatusChange - no more retries');
        throw new Error(`pollUntilConditionMet all retries used calling ${fnToRun}`);
    }
    logger.debug(`calling ${fnToRun.name} retries = ${retries}`);
    const result = (await fnToRun());
    if (conditionChecker(result)) {
        return result;
    }
    logger.debug(`Waiting ${interval}ms before running ${fnToRun.name} and checking condition ${conditionChecker}`);
    await sleep(interval);
    return pollUntilConditionMet(fnToRun, conditionChecker, interval, retries - 1);
};