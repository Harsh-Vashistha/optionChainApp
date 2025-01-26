/**
 * Updates the option chain data with real-time updates
 * @param {Object} params - The parameters object
 * @param {Array} params.data - Array of updated option data
 * @param {Object} params.state - Current state object
 * @param {Object} params.state.tokenStrikePriceMap - Map of token to strike price and type
 * @param {Object} params.state.chainData - Current chain data
 * @param {Function} params.dispatch - Dispatch function to update state
 */
export const updateOptionChain = ({ data, state, dispatch }) => {
    const { tokenStrikePriceMap, chainData } = state;
    const updatedChainData = { ...chainData };

    data?.forEach((item) => {
        const { token, ltp } = item || {};

        if (token && tokenStrikePriceMap?.[token]) {
            const { strike: contractStrikePrice, option_type: contractType } = tokenStrikePriceMap[token];

            // Initialize the strike price object if it doesn't exist
            if (!updatedChainData[contractStrikePrice]) {
                updatedChainData[contractStrikePrice] = {};
            }

            // Update the contract data
            updatedChainData[contractStrikePrice][contractType] = {
                ...(updatedChainData[contractStrikePrice][contractType] || {}),
                ...item,
                ltp: ltp ? parseFloat(ltp).toFixed(3) : '0.00',
            };
        }
    });

    // Dispatch the update only once after all updates are processed
    dispatch({
        type: 'UPDATE_CHAIN_DATA',
        payload: updatedChainData,
    });
}; 