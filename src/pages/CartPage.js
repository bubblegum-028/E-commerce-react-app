import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, loading, error } = useCart();
    const navigate = useNavigate(); // Initialize navigate

    // Calculate grand total
    const grandTotal = cart.reduce(
        (total, item) => total + parseFloat(item.price || 0) * (item.quantity || 0),
        0
    );

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading your cart items...</p>
            </div>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Your Shopping Cart</h1>
            {error && <Alert variant="danger">{error}</Alert>}

            {cart.length === 0 ? (
                <div className="text-center">
                    <h4>Your cart is empty!</h4>
                    <Button variant="primary" href="/products" className="mt-3">
                        Shop Now
                    </Button>
                </div>
            ) : (
                <>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {cart.map((item) => (
                            <Col key={item.id}>
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{item.product.description}</Card.Title>
                                        <Card.Text>
                                            <strong>Category:</strong> {item.product.category} <br />
                                            <strong>Price:</strong> ${parseFloat(item.product.price).toFixed(2)} <br />
                                            <strong>Quantity:</strong> {item.quantity} <br />
                                            <strong>Total:</strong> $
                                            {(parseFloat(item.price) * item.quantity).toFixed(2)}
                                        </Card.Text>
                                        <Button
                                            variant="danger"
                                            onClick={() => removeFromCart(item.id)}
                                            className="me-2"
                                        >
                                            Remove
                                        </Button>
                                        <Button
                                            variant="success"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="me-2"
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="warning"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    Math.max(item.quantity - 1, 1)
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-end mt-4">
                        <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
                        <Button
                            variant="success"
                            className="mt-3"
                            onClick={() => navigate('/checkout')} // Navigate to the checkout page
                        >
                            Checkout
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default CartPage;
