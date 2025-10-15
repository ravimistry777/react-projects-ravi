import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const EmployeeForm = ({ onSubmit, editingEmployee, onCancel }) => {
    const initialForm = {
        name: "",
        age: "",
        department: "",
        position: "",
        email: "",
        salary: ""
    };

    const [inputForm, setInputForm] = useState(initialForm);
    const [inputErr, setInputErr] = useState({});

    useEffect(() => {
        if (editingEmployee) {
            setInputForm(editingEmployee);
        } else {
            setInputForm(initialForm);
        }
    }, [editingEmployee]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "age" || name === "salary") {
            if (value === "" || /^\d+$/.test(value)) {
                setInputForm({
                    ...inputForm,
                    [name]: value
                });
            }
        } else {
            setInputForm({
                ...inputForm,
                [name]: value,
            });
        }
    };

    const handleError = () => {
        let errors = {};

        if (inputForm.name === "") {
            errors.nameErr = "Name is required";
        }

        if (inputForm.age === "") {
            errors.ageErr = "Age is required";
        } else if (inputForm.age < 18 || inputForm.age > 65) {
            errors.ageErr = "Age must be between 18 and 65";
        }

        if (inputForm.email === "") {
            errors.emailErr = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(inputForm.email)) {
            errors.emailErr = "Email is invalid";
        }

        if (inputForm.department === "") {
            errors.departmentErr = "Department is required";
        }

        if (inputForm.position === "") {
            errors.positionErr = "Position is required";
        }

        if (inputForm.salary === "") {
            errors.salaryErr = "Salary is required";
        } else if (inputForm.salary < 0) {
            errors.salaryErr = "Salary cannot be negative";
        }

        setInputErr(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleError()) {
            onSubmit(inputForm);
            if (!editingEmployee) {
                setInputForm(initialForm);
            }
            setInputErr({});
        }
    };

    return (
        <Card>
            <Card.Header className="bg-primary text-white">
                <h5>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={inputForm.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            isInvalid={!!inputErr.nameErr}
                        />
                        <Form.Control.Feedback type="invalid">
                            {inputErr.nameErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="age"
                                    value={inputForm.age}
                                    onChange={handleChange}
                                    placeholder="Enter age"
                                    min="18"
                                    max="65"
                                    isInvalid={!!inputErr.ageErr}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {inputErr.ageErr}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="salary"
                                    value={inputForm.salary}
                                    onChange={handleChange}
                                    placeholder="Enter salary"
                                    min="0"
                                    isInvalid={!!inputErr.salaryErr}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {inputErr.salaryErr}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={inputForm.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            isInvalid={!!inputErr.emailErr}
                        />
                        <Form.Control.Feedback type="invalid">
                            {inputErr.emailErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                            name="department"
                            value={inputForm.department}
                            onChange={handleChange}
                            isInvalid={!!inputErr.departmentErr}
                        >
                            <option value="">Select Department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {inputErr.departmentErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Select
                            name="position"
                            value={inputForm.position}
                            onChange={handleChange}
                            isInvalid={!!inputErr.positionErr}
                        >
                            <option value="">Select Position</option>
                            <option value="Developer">Developer</option>
                            <option value="Manager">Manager</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Designer">Designer</option>
                            <option value="Intern">Intern</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {inputErr.positionErr}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button
                            variant={editingEmployee ? "warning" : "primary"}
                            type="submit"
                        >
                            {editingEmployee ? 'Update Employee' : 'Add Employee'}
                        </Button>

                        {editingEmployee && (
                            <Button
                                variant="outline-secondary"
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EmployeeForm;