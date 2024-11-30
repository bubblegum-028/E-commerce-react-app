import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const navigate = useNavigate();

    // Function to check password strength
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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Simple form validation
        if (!name || !email || !password || !contact) {
            setError('All fields are required.');
            return;
        }

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Password strength check
        if (passwordStrength !== 'Strong') {
            setError('Password should be strong (at least 6 characters with letters and numbers).');
            return;
        }

        // Save user data in localStorage (or you can save it in a backend)
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        registeredUsers.push({ name, email, password, contact });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        // Redirect to login after successful registration
        navigate('/login');
    };

    return (
        <div className="registration-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="shadow-sm" style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
                    <Card.Body>
                        <h2 className="text-center">Register</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            {/* Name Field */}
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

                            {/* Email Field */}
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {/* Password Field */}
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}
                                    required
                                />
                                {password && (
                                    <Form.Text className="text-muted">
                                        Password strength: {passwordStrength}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            {/* Contact Information Field */}
                            <Form.Group controlId="formBasicContact">
                                <Form.Label>Contact Information</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter contact info"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {/* Submit Button */}
                            <Button variant="primary" type="submit" className="w-100 submit-button mb-3">
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default UserRegistration;
