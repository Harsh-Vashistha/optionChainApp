export const formatToFixed = (number) => {
    if (number === null || number === undefined || isNaN(number)) {
        return '-';
    }
    return Number(number).toFixed(2);
}; 