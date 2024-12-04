import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import Searchbar from '../components/Searchbar'; // Import Searchbar
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext'; // Import the cart context

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [sortStock, setSortStock] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { cart } = useCart(); // Access cart from context

    // Safely handle cart, ensuring it is always treated as an array
    const validCart = Array.isArray(cart) ? cart : [];
    const cartCount = validCart.reduce((count, item) => count + (item.quantity || 0), 0);

    // Fetch products when component mounts
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
                setFilteredProducts(productsData); // Initialize filtered products
            } catch (error) {
                setError(error.message);
            }
        };
        loadProducts();
    }, []);

    // Filter and sort products based on search term, category, price, and stock
    useEffect(() => {
        let filtered = products.filter((product) =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true)
        );

        // Sort by price
        if (sortPrice) {
            filtered = filtered.sort((a, b) =>
                sortPrice === 'asc' ? a.price - b.price : b.price - a.price
            );
        }

        // Sort by stock
        if (sortStock) {
            filtered = filtered.sort((a, b) =>
                sortStock === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, sortPrice, sortStock, products]);

    // Handle search input
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Handle category filter change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Handle price sorting change
    const handleSortPriceChange = (e) => {
        setSortPrice(e.target.value);
    };

    // Handle stock sorting change
    const handleSortStockChange = (e) => {
        setSortStock(e.target.value);
    };

    // Handle Logout
    const handleLogout = () => {
        // Clear authentication-related data
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        // Refresh the page, then navigate to login after 2 seconds
        setTimeout(() => {
            window.location.reload(); // Refresh the page
            setTimeout(() => {
                navigate('/login', { replace: true }); // Redirect to login page
            }, 100); // Add a short delay after refresh to ensure smooth navigation
        }, 2000);
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Shop Our Products</h1>
                <div>
                    {/* Cart Button with Count */}
                    <Button
                        variant="success"
                        className="me-3 position-relative"
                        onClick={() => navigate('/cart')}
                    >
                        Cart
                        {cartCount > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: '0.75rem' }}
                            >
                                {cartCount}
                            </span>
                        )}
                    </Button>

                    {/* Logout Button */}
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            {/* Searchbar */}
            <Searchbar onSearch={handleSearch} />

            {/* Category Filter */}
            <Form.Group controlId="formCategory" className="mb-4">
                <Form.Label>Filter by Category</Form.Label>
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Books">Books</option>
                    <option value="Toys">Toys</option>
                </Form.Select>
            </Form.Group>

            {/* Sorting Options */}
            <Row className="mb-4">
                <Col sm={6} md={3}>
                    <Form.Group controlId="sortPrice">
                        <Form.Label>Sort by Price</Form.Label>
                        <Form.Select value={sortPrice} onChange={handleSortPriceChange}>
                            <option value="">Select Sorting</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col sm={6} md={3}>
                    <Form.Group controlId="sortStock">
                        <Form.Label>Sort by Stock</Form.Label>
                        <Form.Select value={sortStock} onChange={handleSortStockChange}>
                            <option value="">Select Sorting</option>
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {/* Display Products */}
            <div>
                {error && <Alert variant="danger">{error}</Alert>}
                {filteredProducts.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {filteredProducts.map((product) => (
                            <Col key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </Container>
    );
};

export default ProductList;
