/**
 * Formats a date string to display in DD MMM format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string (e.g., "25 Jan")
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
    });
};

/**
 * Calculates the number of days left from today to a target date
 * @param {string} targetDate - The target date string
 * @returns {number} Number of days left (0 if date has passed)
 */
export const calculateDaysLeft = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const timeDifference = target - today; // Difference in milliseconds
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
    return daysLeft > 0 ? daysLeft : 0; // Return 0 if the date has passed
}; 