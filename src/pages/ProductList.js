import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { fetchProducts } from '../api';

const ProductList = () => {
    const [products, setProducts] = useState([]); // State to hold all products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for details modal
    const [showModal, setShowModal] = useState(false); // Modal visibility state

    // Fetch products when component mounts
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts(); // Fetch products from API
                setProducts(productsData); // Update state with fetched products
            } catch (err) {
                setError('Failed to load products. Please try again later.'); // Handle fetch error
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };
        loadProducts();
    }, []); // Empty dependency array ensures it only runs once

    // Handle product click to open modal
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Close the modal
    const closeModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Products</h1>
            {loading ? (
                <Spinner animation="border" variant="primary" /> // Display spinner during loading
            ) : error ? (
                <Alert variant="danger">{error}</Alert> // Display error message
            ) : products.length === 0 ? (
                <p>No products available at the moment.</p> // Message when no products are found
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={product.image || 'https://via.placeholder.com/150'}
                                    alt={product.description}
                                />
                                <Card.Body>
                                    <Card.Title>{product.description}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Card.Text>Category: {product.category}</Card.Text>
                                    <Card.Text>Available: {product.quantity}</Card.Text>
                                    <Button variant="primary" onClick={() => handleProductClick(product)}>
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Product Details Modal */}
            {selectedProduct && (
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedProduct.description}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Price: ${selectedProduct.price}</p>
                        <p>Category: {selectedProduct.category}</p>
                        <p>Available Quantity: {selectedProduct.quantity}</p>
                        <p>Barcode: {selectedProduct.barcode}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default ProductList;
