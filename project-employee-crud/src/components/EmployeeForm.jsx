import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { FaUser, FaBirthdayCake, FaBuilding, FaBriefcase, FaEnvelope, FaRupeeSign } from 'react-icons/fa';

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
        setInputForm({ ...inputForm, [name]: value });
        if (inputErr[`${name}Err`]) {
            setInputErr({ ...inputErr, [`${name}Err`]: "" });
        }
    };

    const handleError = () => {
        let errors = {};
        if (!inputForm.name) errors.nameErr = "Name is required";
        if (!inputForm.age) errors.ageErr = "Age is required";
        else if (inputForm.age < 18 || inputForm.age > 65) errors.ageErr = "Age must be 18-65";
        if (!inputForm.email) errors.emailErr = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(inputForm.email)) errors.emailErr = "Email is invalid";
        if (!inputForm.department) errors.departmentErr = "Department is required";
        if (!inputForm.position) errors.positionErr = "Position is required";
        if (!inputForm.salary) errors.salaryErr = "Salary is required";
        else if (inputForm.salary < 0) errors.salaryErr = "Salary cannot be negative";

        setInputErr(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleError()) {
            onSubmit(inputForm);
            if (!editingEmployee) setInputForm(initialForm);
            setInputErr({});
        }
    };

    return (
        <Form id="employee-form" onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><FaUser /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="name"
                                value={inputForm.name}
                                onChange={handleChange}
                                isInvalid={!!inputErr.nameErr}
                                placeholder="John Doe"
                            />
                            <Form.Control.Feedback type="invalid">{inputErr.nameErr}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><FaBirthdayCake /></InputGroup.Text>
                            <Form.Control
                                type="number"
                                name="age"
                                value={inputForm.age}
                                onChange={handleChange}
                                isInvalid={!!inputErr.ageErr}
                                placeholder="25"
                            />
                            <Form.Control.Feedback type="invalid">{inputErr.ageErr}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                    <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                    <Form.Control
                        type="email"
                        name="email"
                        value={inputForm.email}
                        onChange={handleChange}
                        isInvalid={!!inputErr.emailErr}
                        placeholder="john@example.com"
                    />
                    <Form.Control.Feedback type="invalid">{inputErr.emailErr}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><FaBuilding /></InputGroup.Text>
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
                            <Form.Control.Feedback type="invalid">{inputErr.departmentErr}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <InputGroup>
                            <InputGroup.Text><FaBriefcase /></InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="position"
                                value={inputForm.position}
                                onChange={handleChange}
                                isInvalid={!!inputErr.positionErr}
                                placeholder="Software Engineer"
                            />
                            <Form.Control.Feedback type="invalid">{inputErr.positionErr}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>
                <InputGroup>
                    <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
                    <Form.Control
                        type="number"
                        name="salary"
                        value={inputForm.salary}
                        onChange={handleChange}
                        isInvalid={!!inputErr.salaryErr}
                        placeholder="50000"
                    />
                    <Form.Control.Feedback type="invalid">{inputErr.salaryErr}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

export default EmployeeForm;
