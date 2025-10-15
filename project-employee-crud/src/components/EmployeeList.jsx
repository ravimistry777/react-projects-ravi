import React from 'react';
import { Card, Table, Button, Badge } from 'react-bootstrap';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
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

  if (employees.length === 0) {
    return (
      <Card>
        <Card.Header>
          <h5>Employee List</h5>
        </Card.Header>
        <Card.Body className="text-center py-5">
          <div className="text-white">
            <h4>No employees found</h4>
            <p>Add employee details using form</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Employee List ({employees.length})</h5>
      </Card.Header>

      <Card.Body className="p-0">
        <Table responsive hover className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div>
                    <strong>{employee.name}</strong>
                    <br />
                    <small className="text-muted">{employee.email}</small>
                  </div>
                </td>
                <td>{employee.age}</td>
                <td>
                  <Badge bg={getDepartmentBadge(employee.department)}>
                    {employee.department}
                  </Badge>
                </td>
                <td>{employee.position}</td>
                <td>₹ {Number(employee.salary).toLocaleString('en-IN')}/-</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default EmployeeList;