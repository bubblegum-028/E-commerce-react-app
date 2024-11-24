import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; 
import '../App.css'; 

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Default credentials
        const defaultEmail = 'admin@example.com';
        const defaultPassword = 'password';
    
        // Assume you have a list of registered users
        const registeredUsers = [
            { email: 'john@gmail.com', password: 'password1' },
            { email: 'user@123.com', password: 'password2' },
            // Add more registered users as needed
        ];
    
        // Check credentials
        if (email === defaultEmail && password === defaultPassword) {
            const userDetails = { email }; // You can include more user details if needed
            onLogin(userDetails); // Call the login function passed as a prop
            navigate('/dashboard');
        } else {
            // Check if the email and password match any registered user
            const registeredUser  = registeredUsers.find(user => user.email === email);
            
            if (registeredUser ) {
                if (registeredUser .password === password) {
                    const userDetails = { email }; // You can include more user details if needed
                    onLogin(userDetails); // Call the login function passed as a prop
                    navigate('/products'); // Redirect to the products list page after login
                } else {
                    setError('Invalid password.'); // Set error message
                }
            } else {
                setError('Invalid email.'); // Set error message
            }
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

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 submit-button mb-3"
                            >
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