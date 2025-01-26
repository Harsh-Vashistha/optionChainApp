/**
 * Utility function to sort an object by date (ascending).
 *
 * @param {Object} obj - The object with date strings as keys.
 * @returns {Object} - A new object with the same keys, sorted by date.
 */
export function sortByDate(obj) {
    if (!obj) return {};

    return Object.fromEntries(
        Object.entries(obj).sort(([dateA], [dateB]) => {
            return new Date(dateA) - new Date(dateB);
        })
    );
} 