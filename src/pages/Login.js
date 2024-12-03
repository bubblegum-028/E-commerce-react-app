import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('user'); // Default to 'user'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
          const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role: loginType }),
          });
      
          const data = await response.json();
          console.log('Login Response:', data); // Debug response
      
          if (response.ok) {
            // Store role and user information locally
            localStorage.setItem('role', data.role);
            localStorage.setItem('user', JSON.stringify(data.user));
      
            // Notify parent about login
            onLogin(data.role);
      
            // Redirect based on role
            if (data.role === 'admin') {
              navigate('/dashboard');
            } else {
              navigate('/products');
            }
          } else {
            setError(data.message || 'Login failed. Please try again.');
          }
        } catch (error) {
          console.error('Request Error:', error);
          setError('An unexpected error occurred. Please try again later.');
        }
      };
      
    
    
    
    
    
      

    return (
        <div className="login-container">
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className="shadow-sm" style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Dropdown for Login Type */}
                        <Form.Group controlId="formLoginType" className="mb-3">
                            <Form.Label>Select Login Type</Form.Label>
                            <Form.Select
                                value={loginType}
                                onChange={(e) => setLoginType(e.target.value)}
                            >
                                <option value="user">User Login</option>
                                <option value="admin">Admin Login</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Login Form */}
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
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mt-4">
                                Login
                            </Button>
                        </Form>

                        {/* Register Link */}
                        <div className="mt-3 text-center">
                            <span>Don't have an account? </span>
                            <a href="/register">Register</a>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
