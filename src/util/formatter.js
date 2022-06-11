/**
 * Round off number based on d.p. passed
 * @param {number} num
 * @param {number} dec
 * @returns Rounded off number
 */
export const roundOffNum = (num, dec) =>
  typeof num === "number" ? parseFloat(num.toFixed(dec)) : num;

/**
 * Format number by separating by the thousands with comma
 * @param {number} num
 * @returns Number comma separated by the thousands
 */
export const formatNum = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * Get salary basis from contract type
 * @param {string} employeetype
 * @returns
 */
export const getSalaryBasis = (employeetype) =>
  employeetype === "Permanent" ? "month" : "hour";
