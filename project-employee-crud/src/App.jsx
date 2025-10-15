import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css';
import Anime from './components/Anime/Anime';
import Diamond from "./components/Anime/Diamond";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // 1st render
      return;
    }
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString()
    };
    setEmployees(prev => [...prev, newEmployee]);
    showAlert('Employee added successfully!');
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setEditingEmployee(null);
    showAlert('Employee updated successfully!');
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      showAlert('Employee deleted successfully!', 'warning');
    }
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
  };

  const cancelEditing = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="App">
      <Container>

        {alert.show && (
          <Alert variant={alert.type} className="mt-3">
            {alert.message}
          </Alert>
        )}

        <Row className="text-center mb-4">
          <Col>
          <Diamond/>
            <h1 className="main-heading">Employee Management System<Anime /></h1>
            {/* <p className="sub-heading">Manage employees</p> */}
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <EmployeeForm
              onSubmit={editingEmployee ? updateEmployee : addEmployee}
              editingEmployee={editingEmployee}
              onCancel={cancelEditing}
            />
          </Col>

          <Col md={8}>
            <EmployeeList
              employees={employees}
              onEdit={startEditing}
              onDelete={deleteEmployee}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
