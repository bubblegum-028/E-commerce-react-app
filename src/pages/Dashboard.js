import React, { useEffect, useState } from 'react';
import { Container, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"];
    
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [barcode, setBarcode] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
                setFilteredProducts(productsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!barcode || !description || !price || !quantity || !category) {
            setError('Please fill in all fields.');
            return;
        }

        const productData = { barcode, description, price, quantity, category };

        try {
            setLoading(true);
            if (editingProductId !== null) {
                await updateProduct(editingProductId, productData);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editingProductId ? { ...product, ...productData } : product
                    )
                );
                setSuccess('Product updated successfully!');
            } else {
                const newProduct = await addProduct(productData);
                setProducts((prevProducts) => [...prevProducts, newProduct]);
                setSuccess('Product added successfully!');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

        setError('');
        resetForm();
    };

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setBarcode(product.barcode);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory(product.category);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            setSuccess('Product deleted successfully!');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setShowModal(false);
        setBarcode('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory('');
        setEditingProductId(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken'); // Remove token from localStorage
        navigate('/'); // Redirect to the login page
    };

    return (
        <Container className="mt-4">
            <h1 className="dashboard-title mb-4">Dashboard</h1>

            {/* Logout Button Positioned to the Right */}
            <div className="d-flex justify-content-end mb-4">
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

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

            {/* Button to trigger modal for adding a new product */}
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Product
            </Button>

            {/* Product Cards */}
            <div className="mt-4">
                {loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : filteredProducts.length === 0 ? (
                    <p>No products available. Please add a product.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            {/* Modal for Adding/Editing Product */}
            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProductId !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Show error or success messages */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    
                    {/* Product Form */}
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
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                        {editingProductId !== null ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Dashboard;