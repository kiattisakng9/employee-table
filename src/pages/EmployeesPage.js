import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EmployeeTable from "../components/EmployeeTable";
import { useAPICallsHook } from "../hooks/useAPICallHook";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const { fetchAllEmployees } = useAPICallsHook();

  // Fetch employees on component mount
  useEffect(() => {
    fetchAllEmployees().then((res) => setEmployees(res));
  }, [fetchAllEmployees]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Employees</h1>
        </Col>
      </Row>
      <Row>
        <EmployeeTable employees={employees} />
      </Row>
    </Container>
  );
};

export default EmployeesPage;
