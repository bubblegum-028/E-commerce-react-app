import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, Container, Row, Col, Card, Form, Table } from 'react-bootstrap';

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart(); // Access cart functions from context

    const grandTotal = cart.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    );

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <div className="text-center">
                    <h4>Your cart is empty!</h4>
                    <p>Browse our products and add items to your cart.</p>
                    <Button variant="primary" href="/products">
                        Shop Now
                    </Button>
                </div>
            ) : (
                <>
                    <Row className="mb-4">
                        <Col>
                            <Table striped bordered hover responsive className="text-center">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <strong>{item.description}</strong>
                                            </td>
                                            <td>${parseFloat(item.price).toFixed(2)}</td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            parseInt(e.target.value, 10)
                                                        )
                                                    }
                                                    className="w-50 mx-auto"
                                                />
                                            </td>
                                            <td>
                                                $
                                                {(
                                                    parseFloat(item.price) * item.quantity
                                                ).toFixed(2)}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <div className="text-end">
                        <h4 className="mb-3">Grand Total: ${grandTotal.toFixed(2)}</h4>
                        <Button
                            variant="success"
                            size="lg"
                            onClick={() => alert('Proceeding to checkout...')}
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
