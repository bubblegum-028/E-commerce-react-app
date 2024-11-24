import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const defaultEmail = 'admin@example.com';
        const defaultPassword = 'password';

        if (email === defaultEmail && password === defaultPassword) {
            // Save login state to localStorage
            localStorage.setItem('isLoggedIn', 'true');
            onLogin();

            // Redirect to the intended page or default to dashboard
            const redirectPath = location.state?.from?.pathname || '/dashboard';
            navigate(redirectPath);
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="shadow-sm" style={{ width: '100%', maxWidth: '450px', height: '400px', padding: '20px' }}>
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

                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="w-100 submit-button mb-3"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
