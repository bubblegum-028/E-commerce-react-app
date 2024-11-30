import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Default credentials for admin
        const defaultEmail = 'admin@example.com';
        const defaultPassword = 'password';

        // Check if the entered email and password match the admin credentials
        if (email === defaultEmail && password === defaultPassword) {
            const userDetails = { email: defaultEmail, role: 'admin' }; // Assigning admin role
            onLogin(userDetails); // Call the login function passed as a prop
            navigate('/dashboard'); // Redirect to dashboard for admin to add products
            return;
        }

        // Retrieve registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const registeredUser = registeredUsers.find(user => user.email === email);

        // Check if user exists and if password matches
        if (registeredUser) {
            if (registeredUser.password === password) {
                const userDetails = { email, role: 'user' }; // Assigning user role
                onLogin(userDetails); // Call the login function passed as a prop
                navigate('/products'); // Redirect to product list for regular users
            } else {
                setError('Invalid password.');
            }
        } else {
            setError('Invalid email.');
        }
    };

    return (
        <div className="login-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="shadow-sm" style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
                    <Card.Body>
                        <h2 className="text-center">Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 submit-button mb-3">
                                Submit
                            </Button>
                            <p className="text-center">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </p>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
