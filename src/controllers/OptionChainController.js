import {
    fetchLatestOptionChains,
    fetchValidContracts,
} from '../models/OptionChainModel';

/**
 * This Controller calls apis and prepare data for the next view
 * This also sets the data in the store after preparing it
 * @param {Object} params - The parameters object
 * @param {Function} params.dispatch - The dispatch function from the context
 * @param {string} params.selectedExpiry - Selected expiry date
 * @param {Object} params.validContractData - Valid contract data
 * @param {Object} params.selectedExpiryData - Selected expiry data
 * @returns {Promise<void>}
 */
export const OptionChainController = async ({
    dispatch,
    selectedExpiry,
    validContractData,
    selectedExpiryData,
}) => {
    try {
        const NIFTYData = validContractData?.NIFTY?.OPT?.[selectedExpiry];

        // Create mapping of contract token with strike price and type
        createTokenStrikePriceMap({ NIFTYData, dispatch });

        // Construct data to show on option table
        constructOptionData({
            selectedExpiryData,
            dispatch,
            NIFTYData,
        });
    } catch (error) {
        console.error('Error in OptionChainController:', error);
    }
};

/**
 * Creates a mapping between token and strike price
 * @param {Object} params - The parameters object
 * @param {Array} params.NIFTYData - NIFTY data array
 * @param {Function} params.dispatch - The dispatch function
 */
const createTokenStrikePriceMap = ({ NIFTYData, dispatch }) => {
    try {
        if (!NIFTYData) return;

        const tokenStrikePriceMap = {};
        NIFTYData.forEach((item) => {
            if (item?.token) {
                tokenStrikePriceMap[item.token] = { ...item };
            }
        });

        dispatch({ type: 'TOKEN_STRIKE_MAP', payload: tokenStrikePriceMap });
    } catch (error) {
        console.error('Error in createTokenStrikePriceMap:', error);
    }
};

/**
 * Constructs option chain data for display
 * @param {Object} params - The parameters object
 * @param {Object} params.selectedExpiryData - Selected expiry data
 * @param {Function} params.dispatch - The dispatch function
 * @param {Array} params.NIFTYData - NIFTY data array
 */
const constructOptionData = ({ selectedExpiryData, dispatch, NIFTYData }) => {
    try {
        if (!selectedExpiryData?.strike || !NIFTYData) return;

        const chainData = selectedExpiryData.strike.reduce((acc, item, index) => {
            acc[item] = {
                CE: {
                    ltp: selectedExpiryData?.call_close?.[index],
                    ...NIFTYData[index],
                },
                PE: {
                    ltp: selectedExpiryData?.put_close?.[index],
                    ...NIFTYData[index],
                },
            };
            return acc;
        }, {});

        dispatch({ type: 'DATA_UPDATE', payload: chainData });
    } catch (error) {
        console.error('Error in constructOptionData:', error);
    }
};

/**
 * Fetches valid contracts from the API
 * @param {Object} params - The parameters object
 * @param {Function} params.dispatch - The dispatch function
 * @param {string} params.selectedExpiry - Selected expiry date
 * @returns {Promise<Object>} Valid contract data
 */
export const getValidContracts = async ({ dispatch, selectedExpiry }) => {
    try {
        const validContractData = await fetchValidContracts(
            (apiData) => {
                const NIFTYData = apiData?.NIFTY?.OPT?.[selectedExpiry || '2025-01-30'];
                return NIFTYData;
            },
            (error) => {
                console.error('Error fetching valid contracts:', error);
            }
        );

        if (validContractData) {
            dispatch({ type: 'SAVE_VALID_CONTRACTS', payload: validContractData });
        }
        return validContractData;
    } catch (error) {
        console.error('Error in getValidContracts:', error);
        return null;
    }
};

/**
 * Fetches latest option chain data
 * @param {Object} params - The parameters object
 * @param {Function} params.dispatch - The dispatch function
 * @param {string} params.selectedExpiry - Selected expiry date
 */
export const getLatestOptions = async ({ dispatch, selectedExpiry }) => {
    try {
        const chainLatestData = await fetchLatestOptionChains(
            (apiData) => {
                // Success callback
            },
            (error) => {
                console.error('Error fetching latest options:', error);
            }
        );

        if (chainLatestData) {
            dispatch({ type: 'LATEST_CONTRACT', payload: chainLatestData });
        }
    } catch (error) {
        console.error('Error in getLatestOptions:', error);
    }
}; 