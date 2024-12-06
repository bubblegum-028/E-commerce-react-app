import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import Searchbar from '../components/Searchbar'; // Import Searchbar
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext'; // Import the cart context
import { MdOutlineShoppingCart } from 'react-icons/md';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortPrice, setSortPrice] = useState('');
    const [sortStock, setSortStock] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { cart } = useCart(); // Access cart from context
    const validCart = Array.isArray(cart) ? cart : [];
    const cartCount = validCart.reduce((count, item) => count + (item.quantity || 0), 0);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
                setFilteredProducts(productsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        let filtered = products.filter((product) =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true)
        );

        if (sortPrice) {
            filtered = filtered.sort((a, b) =>
                sortPrice === 'asc' ? a.price - b.price : b.price - a.price
            );
        }

        if (sortStock) {
            filtered = filtered.sort((a, b) =>
                sortStock === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, sortPrice, sortStock, products]);

    const handleSearch = (term) => setSearchTerm(term);

    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    const handleSortPriceChange = (e) => setSortPrice(e.target.value);

    const handleSortStockChange = (e) => setSortStock(e.target.value);

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        await navigate('/login');
        window.location.reload();
    };

    useEffect(() => {
        console.log('Cart:', validCart);
        console.log('Cart Count:', cartCount);
    }, [cart]);

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Shop Our Products</h1>
                <div className="d-flex align-items-center">
                    <Button
                        variant="success"
                        className="me-3 d-flex align-items-center"
                        onClick={() => navigate('/cart')}
                    >
                        <MdOutlineShoppingCart style={{ fontSize: '1.5rem' }} />
                        {cartCount > 0 && (
                            <span className="ms-2" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                {cartCount}
                            </span>
                        )}
                    </Button>

                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            <Searchbar onSearch={handleSearch} />

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

            {loading ? (
                <div>Loading products...</div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {filteredProducts.map((product) => (
                        <Col key={product.id}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default ProductList;
