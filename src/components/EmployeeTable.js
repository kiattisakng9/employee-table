import React from "react";
import { Table } from "react-bootstrap";

const EmployeeTable = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Birthdate</th>
          <th>Age (Years)</th>
          <th>Contract Type</th>
          <th>Start Date</th>
          <th>Salary</th>
          <th>Employment duration (months)</th>
          <th>Provident Fund Rate</th>
          <th>Provident Fund Employee Contribution</th>
          <th>Provident Fund Company Contribution</th>
          <th>Provident Fund as of Today</th>
        </tr>
      </thead>
    </Table>
  );
};

export default EmployeeTable;
