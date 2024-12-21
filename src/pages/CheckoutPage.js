import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Container, Row, Col, Table, Form, Button, Alert } from 'react-bootstrap';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate(); // For navigation after checkout
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        paymentMethod: 'COD',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Calculate grand total
    const grandTotal = cart?.data?.reduce(
        (total, item) => total + parseFloat(item.price || 0) * (item.quantity || 0),
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        if (!shippingInfo.name || !shippingInfo.address) {
            setError('Please fill out all required fields.');
            return;
        }

        try {
            // Mock API call for order placement
            console.log('Placing Order:', { cart, shippingInfo });
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

            setSuccessMessage('Order placed successfully!');
            clearCart(); // Clear the cart after successful order
            setError(null); // Clear any previous error
            setTimeout(() => {
                navigate('/confirmation'); // Redirect to confirmation page after a delay
            }, 2000); // Adjust delay as needed
        } catch (err) {
            console.error('Checkout failed:', err);
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Checkout</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Row>
                {/* Cart Summary */}
                <Col md={6}>
                    <h4>Order Summary</h4>
                    {cart.length === 0 ? (
                        <p>Your cart is empty. Please add items to proceed with checkout.</p>
                    ) : (
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.data?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.product.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>${parseFloat(item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2"><strong>Grand Total</strong></td>
                                    <td>${grandTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </Col>

                {/* Shipping Details */}
                <Col md={6}>
                    <h4>Shipping Information</h4>
                    <Form onSubmit={handleCheckout}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={shippingInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select
                                name="paymentMethod"
                                value={shippingInfo.paymentMethod}
                                onChange={handleInputChange}
                            >
                                <option value="COD">Cash on Delivery</option>
                                <option value="Card">Credit/Debit Card</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="success" disabled={cart.length === 0}>
                            Place Order
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;
