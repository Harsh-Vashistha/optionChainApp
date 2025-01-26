import callApi from '../utils/apiUtils';

/**
 * Fetches valid contracts from the API
 * @param {Function} successCb - Success callback
 * @param {Function} errCb - Error callback
 * @returns {Promise<Object>} The valid contracts data
 */
export const fetchValidContracts = (successCb, errCb) => {
    return callApi(
        'https://prices.algotest.xyz/contracts',
        'GET',
        null,
        (data) => {
            if (successCb) successCb(data);
            return data;
        },
        (error) => {
            console.error('GET request failed:', error);
            if (errCb) errCb(error);
            return error;
        }
    );
};

/**
 * Fetches latest option chains from the API
 * @param {Function} successCb - Success callback
 * @param {Function} errCb - Error callback
 * @returns {Promise<Object>} The latest option chain data
 */
export const fetchLatestOptionChains = (successCb, errCb) => {
    return callApi(
        'https://prices.algotest.xyz/option-chain-with-ltp?underlying=NIFTY',
        'GET',
        null,
        (data) => {
            if (successCb) successCb(data);
            return data;
        },
        (error) => {
            console.error('GET request failed:', error);
            if (errCb) errCb(error);
            return error;
        }
    );
}; 