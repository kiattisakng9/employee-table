/**
 * Check if employee is eligible for Provident fund
 * @param {number} employmentMonths
 * @param {string} employeetype
 * @returns Boolean - If employee is eligible for Provident Fund
 */
export const isEligibleForPVF = (employmentMonths, employeetype) =>
  employmentMonths > 3 && employeetype === "Permanent";
