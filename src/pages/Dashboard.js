// src/pages/Dashboard.js
import React, { useState } from 'react';
import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Dashboard = ({ products, setProducts }) => {
    // State variables for managing product form and modal visibility
    const [showModal, setShowModal] = useState(false);
    const [barcode, setBarcode] = useState(''); // State for barcode input
    const [description, setDescription] = useState(''); // State for description input
    const [price, setPrice] = useState(''); // State for price input
    const [quantity, setQuantity] = useState(''); // State for quantity input
    const [category, setCategory] = useState(''); // State for category input
    const [error, setError] = useState(''); // State for error messages
    const [success, setSuccess] = useState(''); // State for success messages
    const [editingProductId, setEditingProductId] = useState(null); // State to track if editing a product

    // Function to handle form submission for adding/editing products
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Validate inputs
        if (!barcode || !description || !price || !quantity || !category) {
            setError('Please fill in all fields.'); // Show error if fields are empty
            return;
        }

        // Check if we're editing an existing product
        if (editingProductId !== null) {
            // Update the product details
            const updatedProducts = products.map((product) => 
                product.id === editingProductId 
                    ? { id: product.id, barcode, description, price, quantity, category } 
                    : product
            );
            setProducts(updatedProducts); // Update the product list
            setSuccess('Product updated successfully!'); // Set success message
        } else {
            // Create a new product object
            const newProduct = {
                id: products.length + 1, // Simple ID assignment, consider using a better ID strategy
                barcode,
                description,
                price,
                quantity,
                category,
            };
            setProducts([...products, newProduct]); // Add the new product to the list
            setSuccess('Product added successfully!'); // Set success message
        }

        setError(''); // Clear error messages
        resetForm(); // Reset the form fields
    };

    // Function to handle editing a product
    const handleEdit = (product) => {
        // Populate the form fields with the selected product's data
        setEditingProductId(product.id);
        setBarcode(product.barcode);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory(product.category);
        setShowModal(true); // Show the modal for editing
    };

    // Function to handle deleting a product
    const handleDelete = (id) => {
        const updatedProducts = products.filter(product => product.id !== id); // Filter out the deleted product
        setProducts(updatedProducts); // Update the product list
        setSuccess('Product deleted successfully!'); // Set success message
    };

    // Function to reset the form fields and close the modal
    const resetForm = () => {
        setShowModal(false); // Close the modal
        setBarcode(''); // Reset barcode field
        setDescription(''); // Reset description field
        setPrice(''); // Reset price field
        setQuantity(''); // Reset quantity field
        setCategory(''); // Reset category field
        setEditingProductId(null); // Reset editing product ID
    };

    return (
        <Container className="mt-4">
            <h1 className="dashboard-title mb-4">Dashboard</h1>

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Product
            </Button>

            <div className="mt-4">
                {products.length === 0 ? (
                    <p>No products available. Please add a product.</p>
                ) : (
                    // Render ProductCard components for each product
                    products.map(product => (
                        <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                )}
            </div>

            {/* Modal for adding/editing products */}
            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProductId !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>} {/* Show error alert if exists */}
                    {success && <Alert variant="success">{success}</Alert>} {/* Show success alert if exists */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicBarcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter barcode"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)} // Update barcode state
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} // Update description state
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} // Update price state
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicQuantity">
                            <Form.Label>Available Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter available quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)} // Update quantity state
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} // Update category state
                                required
                            >
                                <option value="">Select category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home Appliances">Home Appliances</option>
                                <option value="Books">Books</option>
                                <option value="Toys">Toys</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            {editingProductId !== null ? 'Update Product' : 'Add Product'} {/* Dynamic button text */}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard; // Export the Dashboard component
