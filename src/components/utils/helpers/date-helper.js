
/**
 * Converts a UNIX timestamp to a Date
 * @param {number} unixTimestamp - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 * @returns {string} The corresponding Date Object formatted as a string
 */
export const convertUnixTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0]; // Formats as YYYY-MM-DD
};

/**
 * Creates a new date by adding days/weeks/months/years to a given date. Negative values will also work (for past dates)
 * @param {Date} date - The specified date
 * @param {number} days - The number (integer) of days to be added/subtracted
 * @param {number} weeks - The number (integer) of weeks to be added/subtracted
 * @param {number} months - The number (integer) of months to be added/subtracted
 * @param {number} years - The number (integer) of years to be added/subtracted
 * @returns {Date} The new date
 */
export const createDate = (date, days, weeks, months, years) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};