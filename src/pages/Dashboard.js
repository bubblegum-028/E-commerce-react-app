import React, { useState } from 'react';
import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import '../App.css'; // Ensure this file is imported for styling

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const [barcode, setBarcode] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!barcode || !description || !price || !quantity || !category) {
            setError('Please fill in all fields.');
            return;
        }

        // Logic to handle product addition can be added here
        console.log({
            barcode,
            description,
            price,
            quantity,
            category,
        });

        // Reset form and set success message
        setBarcode('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setSuccess('Product added successfully!');
        setError('');
        setShowModal(false); // Close modal after submission
    };

    return (
        <Container className="mt-4">
            <h1 className="dashboard-title mb-4">Dashboard</h1>

            <Button 
                variant="primary" 
                onClick={() => setShowModal(true)} // Open modal
            >
                Add Product
            </Button>

            {/* Modal for Add Product Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicBarcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter barcode"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicQuantity">
                            <Form.Label>Available Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter available quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home Appliances">Home Appliances</option>
                                <option value="Books">Books</option>
                                <option value="Toys">Toys</option>
                                {/* Add more categories as needed */}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Product
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;
