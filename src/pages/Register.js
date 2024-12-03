import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const checkPasswordStrength = (password) => {
        const length = password.length;
        if (length < 6) {
            setPasswordStrength('Weak');
        } else if (length >= 6 && /[A-Za-z]/.test(password) && /\d/.test(password)) {
            setPasswordStrength('Strong');
        } else {
            setPasswordStrength('Medium');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword); // Check password strength
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, contact, role }),
            });

            const data = await response.json();
            if (response.ok) {
                const roleMessage = role === 'admin' ? 'Admin registered successfully!' : 'User registered successfully!';
                setSuccessMessage(roleMessage);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.errors ? Object.values(data.errors).join(', ') : data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="shadow-sm" style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Register</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        <Form onSubmit={handleRegister}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                {password && (
                                    <small className={`text-${passwordStrength === 'Weak' ? 'danger' : passwordStrength === 'Medium' ? 'warning' : 'success'}`}>
                                        Password Strength: {passwordStrength}
                                    </small>
                                )}
                            </Form.Group>
                            <Form.Group controlId="formBasicContact" className="mt-3">
                                <Form.Label>Contact Information</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your contact information"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicRole" className="mt-3">
                                <Form.Label>Select Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-4">
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
