import React from "react";
import { formatNum } from "../util/formatter";

const EmployeeItem = (props) => {
  const employee = props.employee;

  return (
    <>
      {employee != null && (
        <tr key={employee.employeeid}>
          <>
            <td>{employee.fullname}</td>
            <td>{employee.birthdate}</td>
            <th>{employee.age}</th>
            <th>{employee.employeetype}</th>
            <th>{employee.startdate}</th>
            <th>{employee.employmentMonths}</th>
            <th>{employee.salary}</th>
            <th>{formatNum(employee.rate)}</th>
            <th>{formatNum(employee.accruedPVFEmp)}</th>
            <th>{formatNum(employee.accruedPVFComp)}</th>
            <th>{formatNum(employee.totalPVF)}</th>
          </>
        </tr>
      )}
    </>
  );
};

export default EmployeeItem;
