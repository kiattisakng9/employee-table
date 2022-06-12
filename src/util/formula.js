import moment from "moment";
import { roundOffNum } from "./formatter";
import { companyContribution, dateFormat, notEligibleText } from "./variables";

const companyPVFContrib = companyContribution;
const notEligibleMsg = notEligibleText;

/**
 * Calculate duration between today and date passed
 * @param {object} date
 * @param {string} unit
 * @returns Duration between today and date passed
 */
export const calculateDuration = (startdate, enddate, unit) => {
  const startDateObj = moment(startdate, dateFormat);
  const endDateObj = moment(enddate, dateFormat);
  const duration = endDateObj.diff(startDateObj, unit);

  return duration;
};

/**
 * Calculate monthly amount of provident fund
 * @param {number} salary
 * @param {number} pvfrate
 * @returns Provident fund monthly amount
 */
const calculateMonthlyPVF = (salary, pvfrate) => {
  const monthlyPVF = (pvfrate / 100) * salary;

  return monthlyPVF;
};

/**
 * Calculate accrued provident fund amount
 * @param {number} salary
 * @param {number} pvfrate
 * @param {string} startdate
 * @returns accrued provident fund amount
 */
export const calculateAccruedPVF = (salary, pvfrate, startdate, enddate) => {
  const monthlyPVF = calculateMonthlyPVF(salary, pvfrate);
  const todate = moment(enddate, dateFormat).format(dateFormat);
  const employmentMonths = calculateDuration(startdate, todate, "months");

  const accruedPVF = employmentMonths * monthlyPVF;

  return accruedPVF;
};

/**
 * Calculate full accrued provident fund amount
 * taking the years of employment into consideration too
 * @param {string} startdate
 * @param {number} baseAmount
 * @returns full accrued provident fund amount
 */
export const calculateCompanyPVFContrib = (startdate, enddate, baseAmount) => {
  const todate = moment(enddate, dateFormat).format(dateFormat);
  const employmentYears = calculateDuration(startdate, todate, "years");

  // Employment years less than 3 years will get 0%
  let PVFProrate = 0;

  // Employment years more than 5 years will get 100%
  if (employmentYears >= 5) PVFProrate = 100;
  // Employment years between 3 and 5 years will get 50%
  else if (employmentYears >= 3) PVFProrate = 50;

  const finalAmount = roundOffNum((PVFProrate / 100) * baseAmount);

  return finalAmount;
};

/**
 * Calculate provident funds
 * @param {boolean} isEligible
 * @param {object} employee
 * @returns provident fund object
 */
export const calculatePVF = (isEligible, employee, startdate, enddate) => {
  const rate = isEligible ? roundOffNum(employee.pvfrate, 2) : notEligibleMsg;

  // Accrued provident fund amount of employee
  const accruedPVFEmp = isEligible
    ? calculateAccruedPVF(employee.salary, employee.pvfrate, startdate, enddate)
    : notEligibleMsg;

  // Accrued provident fund of company's contribution
  const accruedPVFComp = isEligible
    ? calculateAccruedPVF(
        employee.salary,
        companyPVFContrib,
        startdate,
        enddate
      )
    : notEligibleMsg;

  // Calculate company's contribution based on years of employment
  const finalAccruedPVFComp = isEligible
    ? calculateCompanyPVFContrib(startdate, enddate, accruedPVFComp)
    : notEligibleMsg;

  // Summ employee's and company's contribution
  const totalPVF = isEligible
    ? roundOffNum(finalAccruedPVFComp, 2) + roundOffNum(accruedPVFEmp, 2)
    : notEligibleMsg;

  return {
    emp: accruedPVFEmp,
    comp: finalAccruedPVFComp,
    total: totalPVF,
    rate,
  };
};
