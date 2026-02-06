import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster, toast } from 'react-hot-toast';
import { FaUserPlus, FaUsers, FaRupeeSign, FaBuilding, FaBell, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Sidebar from './components/Dashboard/Sidebar';
import StatsCard from './components/Dashboard/StatsCard';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const isInitialLoad = useRef(true);

  // Load from LocalStorage
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
        // Seed data for demo if empty
        setEmployees([
            { id: '1', name: 'Ravi Siddhapura', age: 25, department: 'Engineering', position: 'Frontend Dev', email: 'ravi@example.com', salary: 75000 },
            { id: '2', name: 'Virat Kohli', age: 34, department: 'Sales', position: 'Sales Manager', email: 'bob@example.com', salary: 65000 },
            { id: '3', name: 'Rohit Sharma', age: 25, department: 'Marketing', position: 'Content Creator', email: 'charlie@example.com', salary: 45000 },
        ]);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // CRUD Operations
  const addEmployee = (employee) => {
    const newEmployee = { ...employee, id: Date.now().toString() };
    setEmployees(prev => [newEmployee, ...prev]); // Add to top
    toast.success('Employee added successfully!');
    handleCloseModal();
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    toast.success('Employee updated successfully!');
    handleCloseModal();
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast.success('Employee deleted successfully!');
    }
  };

  // Modal Handlers
  const handleShowModal = (employee = null) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingEmployee(null);
    setShowModal(false);
  };

  // Stats Calculation
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((acc, emp) => acc + Number(emp.salary), 0);
  const activeDepartments = new Set(employees.map(emp => emp.department)).size;

  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-wrapper">
        {/* Top Header */}
        <div className="top-header">
            <div>
                <h5 className="m-0 fw-bold text-dark">
                    {activeTab === 'dashboard' ? 'Dashboard Overview' : 'Employee Management'}
                </h5>
                <small className="text-muted">Welcome back, Admin</small>
            </div>
            <div className="d-flex align-items-center gap-3">
                <Button variant="light" className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                    <FaBell className="text-muted" />
                </Button>
                <div className="vr h-50 my-auto"></div>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    <FaUserPlus className="me-2" /> Add Employee
                </Button>
            </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
            <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Row className="mb-4 g-4">
                            <Col md={4}>
                                <StatsCard title="Total Employees" value={totalEmployees} icon={<FaUsers />} color="primary" trend={12} />
                            </Col>
                            <Col md={4}>
                                <StatsCard title="Total Payroll" value={`₹${totalSalary.toLocaleString()}`} icon={<FaRupeeSign />} color="success" trend={5} />
                            </Col>
                            <Col md={4}>
                                <StatsCard title="Departments" value={activeDepartments} icon={<FaBuilding />} color="warning" trend={0} />
                            </Col>
                        </Row>

                        <div className="mb-4">
                            <h5 className="mb-3 fw-bold text-dark">Recent Hires</h5>
                            <EmployeeList 
                                employees={employees} 
                                onEdit={handleShowModal} 
                                onDelete={deleteEmployee} 
                                showSearch={false}
                                limit={5}
                            />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'employees' && (
                    <motion.div
                        key="employees"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <EmployeeList 
                            employees={employees} 
                            onEdit={handleShowModal} 
                            onDelete={deleteEmployee} 
                            showSearch={true}
                        />
                    </motion.div>
                )}
                
                {activeTab !== 'dashboard' && activeTab !== 'employees' && (
                     <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-5"
                     >
                        <h3>Coming Soon</h3>
                        <p>This module is currently under development.</p>
                     </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EmployeeForm 
                onSubmit={editingEmployee ? updateEmployee : addEmployee}
                editingEmployee={editingEmployee}
                onCancel={handleCloseModal}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={handleCloseModal}>Cancel</Button>
            <Button variant="primary" form="employee-form" type="submit">
                {editingEmployee ? 'Save Changes' : 'Add Employee'}
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
