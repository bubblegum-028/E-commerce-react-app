// src/pages/ViewProducts.js
import React, { useState } from 'react'; // Import necessary libraries
import { Button, Modal, Alert, Form, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import ProductCard from '../components/ProductCard'; // Import the ProductCard component

// ViewProducts component: Displays the list of products and handles editing and deleting products
const ViewProducts = ({ products, setProducts }) => {
    const [showEditModal, setShowEditModal] = useState(false); // State to control modal visibility
    const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the product currently being edited
    const [error, setError] = useState(''); // State to manage error messages
    const [success, setSuccess] = useState(''); // State to manage success messages

    // Handle click event for editing a product
    const handleEditClick = (product) => {
        setSelectedProduct(product); // Set the selected product to edit
        setShowEditModal(true); // Show the edit modal
    };

    // Handle closing the edit modal
    const handleCloseEditModal = () => {
        setShowEditModal(false); // Hide the edit modal
        setSelectedProduct(null); // Clear the selected product
        setError(''); // Clear any error messages
        setSuccess(''); // Clear any success messages
    };

    // Handle form submission for editing a product
    const handleEditSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const { barcode, description, price, quantity, category } = selectedProduct; // Destructure selected product

        // Validate input fields
        if (!barcode || !description || !price || !quantity || !category) {
            setError('Please fill in all fields.'); // Set error if validation fails
            return; // Exit the function
        }

        // Update the product list with the edited product
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
        );

        setSuccess('Product updated successfully!'); // Set success message
        setError(''); // Clear any error messages
        handleCloseEditModal(); // Close the edit modal
    };

    // Handle input changes in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure input name and value
        setSelectedProduct({ ...selectedProduct, [name]: value }); // Update the selected product state
    };

    // Handle product deletion
    const handleDelete = (id) => {
        const updatedProducts = products.filter(product => product.id !== id); // Filter out the deleted product
        setProducts(updatedProducts); // Update the product list
        setSuccess('Product deleted successfully!'); // Set success message
    };

    return (
        <Container className="mt-4"> {/* Main container for the component */}
            <h1>Product List</h1>
            {products.length === 0 ? ( // Check if there are no products
                <p>No products available. Please add a product.</p> // Message if no products exist
            ) : (
                <Row> {/* Row for responsive layout of product cards */}
                    {products.map((product) => ( // Map through products to create ProductCard components
                        <Col md={6} key={product.id}> {/* Use Bootstrap grid system for layout */}
                            <ProductCard
                                product={product}
                                onEdit={handleEditClick} // Pass edit handler
                                onDelete={handleDelete} // Pass delete handler
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Edit Product Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}> {/* Modal for editing a product */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title> {/* Modal title */}
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if exists */}
                    {success && <Alert variant="success">{success}</Alert>} {/* Display success message if exists */}
                    {selectedProduct && ( // Render form if a product is selected for editing
                        <Form onSubmit={handleEditSubmit}>
                            <Form.Group controlId="formBasicBarcode">
                                <Form.Label>Barcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter barcode"
                                    name="barcode" // Input name matches product property
                                    value={selectedProduct.barcode} // Bind value to selected product's barcode
                                    onChange={handleInputChange} // Handle input changes
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product description"
                                    name="description" // Input name matches product property
                                    value={selectedProduct.description} // Bind value to selected product's description
                                    onChange={handleInputChange} // Handle input changes
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    name="price" // Input name matches product property
                                    value={selectedProduct.price} // Bind value to selected product's price
                                    onChange={handleInputChange} // Handle input changes
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicQuantity">
                                <Form.Label>Available Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter available quantity"
                                    name="quantity" // Input name matches product property
                                    value={selectedProduct.quantity} // Bind value to selected product's quantity
                                    onChange={handleInputChange} // Handle input changes
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    name="category" // Input name matches product property
                                    value={selectedProduct.category} // Bind value to selected product's category
                                    onChange={handleInputChange} // Handle input changes
                                    required
                                >
                                    <option value="">Select category</option> {/* Default option */}
                                    <option value="Electronics">Electronics</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Home Appliances">Home Appliances</option>
                                    <option value="Books">Books</option>
                                    <option value="Toys">Toys</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3"> {/* Submit button to update product */}
                                Update Product
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ViewProducts; // Export the ViewProducts component for use in other parts of the application