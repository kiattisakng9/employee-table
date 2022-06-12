import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { isEligibleForPVF } from "../util/checker";
import { formatNum, getSalaryBasis } from "../util/formatter";
import { calculateDuration, calculatePVF } from "../util/formula";
import { dateFormat, salaryCurrency } from "../util/variables";
import EmployeeItem from "./EmployeeItem";

const EmployeeTable = (props) => {
  const [formattedEmployees, setFormattedEmployees] = useState([]);
  const currency = salaryCurrency;

  /**
   * Format employees object and calculate values
   * @param {Object} employees
   */
  const formatEmployees = useCallback(
    (employees) => {
      const today = moment().format(dateFormat);
      const amendedEmployees = employees.map((employee) => {
        // Full name of employee
        const fullname = `${employee.firstname} ${employee.lastname}`;
        const age = calculateDuration(employee.birthdate, today, "years");

        // Salary column
        const salaryBasis = getSalaryBasis(employee.employeetype);
        const salary = `${formatNum(
          employee.salary
        )} ${currency}/${salaryBasis}`;

        // Employment months
        const employmentMonths = calculateDuration(
          employee.startdate,
          today,
          "months"
        );

        // Check if employee is eligible for provident fund
        const employeeIsEligible = isEligibleForPVF(
          employmentMonths,
          employee.employeetype
        );

        // Provident fund calculations
        const pfv = calculatePVF(
          employeeIsEligible,
          employee,
          employee.startdate,
          today
        );

        // Provident fund details
        const rate = pfv.rate;
        const accruedPVFEmp = pfv.emp;
        const accruedPVFComp = pfv.comp;
        const totalPVF = pfv.total;

        return {
          ...employee,
          fullname,
          age,
          salary,
          employmentMonths,
          rate,
          accruedPVFEmp,
          accruedPVFComp,
          totalPVF,
        };
      });

      setFormattedEmployees(amendedEmployees);
    },
    [currency]
  );

  useEffect(() => {
    formatEmployees(props.employees);

    return () => {
      setFormattedEmployees([]);
    };
  }, [props.employees, formatEmployees]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Birthdate</th>
          <th>Age (Years)</th>
          <th>Contract Type</th>
          <th>Start Date</th>
          <th>Employment duration (months)</th>
          <th>Salary</th>
          <th>Provident Fund Rate (%)</th>
          <th>Provident Fund Employee Contribution ({currency})</th>
          <th>Provident Fund Company Contribution ({currency})</th>
          <th>Provident Fund as of Today</th>
        </tr>
      </thead>
      <tbody>
        {formattedEmployees.map((employee, i) => (
          <EmployeeItem key={i} employee={employee} />
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
