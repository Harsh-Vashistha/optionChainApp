import { useMemo } from 'react';

export const useOptionChainViewModel = ({ data }) => {
    const transformedData = useMemo(() => (data) => {
        return Object.entries(data).map(([strike, value]) => ({
            strikePrice: strike,
            ...value
        }));
    }, [data]);

    const formatLTP = (ltp) => {
        if (!ltp) return '-';
        return parseFloat(ltp).toFixed(2);
    };

    return {
        rowData: transformedData(data),
        formatLTP,
    };
}; 