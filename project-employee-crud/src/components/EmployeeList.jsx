import React, { useState } from 'react';
import { Card, Table, Badge, Form, InputGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaUserTie, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const EmployeeList = ({ employees, onEdit, onDelete, showSearch = true, limit = null }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const getDepartmentBadge = (department) => {
    const departmentColors = {
      'Engineering': 'primary',
      'Marketing': 'success',
      'Sales': 'warning',
      'HR': 'danger',
      'Finance': 'info'
    };
    return departmentColors[department] || 'secondary';
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayEmployees = limit ? filteredEmployees.slice(0, limit) : filteredEmployees;

  if (employees.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5">
        <div className="bg-light rounded-circle p-4 mb-3 d-inline-block">
            <FaUserTie size={48} className="text-secondary" />
        </div>
        <h4 className="text-dark fw-bold">No employees found</h4>
        <p className="text-muted">Get started by adding a new employee.</p>
      </motion.div>
    );
  }

  const renderSortIcon = (key) => {
      if (sortConfig.key !== key) return <FaSort className="text-muted ms-1" style={{ fontSize: '0.7em' }} />;
      return sortConfig.direction === 'ascending' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />;
  };

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      {showSearch && (
        <Card.Header className="bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
            <h5 className="mb-0 fw-bold">Employee Directory <Badge bg="light" text="dark" className="ms-2 border">{filteredEmployees.length}</Badge></h5>
            <div style={{ maxWidth: '300px', width: '100%' }}>
                <InputGroup className="search-input-group">
                    <InputGroup.Text><FaSearch className="text-muted small"/></InputGroup.Text>
                    <Form.Control 
                        type="text" 
                        placeholder="Search employees..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </div>
        </Card.Header>
      )}

      <div className="table-responsive">
        <Table hover className="mb-0 align-middle table-custom">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }} className="ps-4">
                  Employee {renderSortIcon('name')}
              </th>
              <th onClick={() => handleSort('position')} style={{ cursor: 'pointer' }}>
                  Role {renderSortIcon('position')}
              </th>
              <th onClick={() => handleSort('department')} style={{ cursor: 'pointer' }}>
                  Department {renderSortIcon('department')}
              </th>
              <th onClick={() => handleSort('salary')} style={{ cursor: 'pointer' }}>
                  Salary {renderSortIcon('salary')}
              </th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
                {displayEmployees.map((employee) => (
                <motion.tr 
                    key={employee.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <td className="ps-4">
                    <div className="d-flex align-items-center">
                        <div className={`avatar-circle me-3 bg-${getDepartmentBadge(employee.department)}`}>
                        {employee.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                        <div className="fw-bold text-dark">{employee.name}</div>
                        <small className="text-muted">{employee.email}</small>
                        </div>
                    </div>
                    </td>
                    <td>
                    <div className="text-dark fw-medium">{employee.position}</div>
                    <small className="text-muted">Age: {employee.age}</small>
                    </td>
                    <td>
                    <Badge bg={`${getDepartmentBadge(employee.department)}-subtle`} text={getDepartmentBadge(employee.department)} className="px-2 py-1">
                        {employee.department}
                    </Badge>
                    </td>
                    <td className="fw-medium text-dark">
                        ₹{Number(employee.salary).toLocaleString()}
                    </td>
                    <td className="text-end pe-4">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                            <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => onEdit(employee)}>
                                <FaEdit />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
                            <Button variant="light" size="sm" className="text-danger" onClick={() => onDelete(employee.id)}>
                                <FaTrash />
                            </Button>
                        </OverlayTrigger>
                    </td>
                </motion.tr>
                ))}
            </AnimatePresence>
            {displayEmployees.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                        No matches found.
                    </td>
                </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default EmployeeList;
