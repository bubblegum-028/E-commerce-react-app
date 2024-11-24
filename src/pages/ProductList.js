import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { fetchProducts } from '../api';
import Searchbar from '../components/Searchbar'; // Custom component for search functionality

const ProductList = () => {
    const [products, setProducts] = useState([]); // State to hold all products
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for details modal
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const [categories, setCategories] = useState([]); // State for product categories

    // Fetch products when component mounts
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts(); // Fetch products from API
                setProducts(productsData); // Update state with fetched products
                // Extract unique categories from products
                const uniqueCategories = [...new Set(productsData.map(product => product.category))];
                setCategories(uniqueCategories); // Update categories state
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

    // Handle search input change
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Filter products based on search term and selected category
    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearchTerm && matchesCategory;
    });

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Products</h1>

            {/* Searchbar component for searching products */}
            <Searchbar onSearch={handleSearch} />

            {/* Category Filter Dropdown */}
            <Form.Group controlId="formBasicCategory" className="mb-4">
                <Form.Label>Filter by Category</Form.Label>
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {loading ? (
                <Spinner animation="border" variant="primary" /> // Display spinner during loading
            ) : error ? (
                <Alert variant="danger">{error}</Alert> // Display error message
            ) : filteredProducts.length === 0 ? (
                <p>No products available at the moment.</p> // Message when no products are found
            ) : (
                <Row>
                    {filteredProducts.map((product) => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{product.description}</Card.Title>
                                    <Card.Text>Price: ${product.price}</Card.Text>
                                    <Card.Text>Category: {product.category}</Card.Text>
                                    <Card.Text>Available: {product.quantity}</Card.Text>

                                    <Button variant="info" onClick={() => handleProductClick(product)}>
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