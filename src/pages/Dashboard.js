import React, { useEffect, useState } from 'react';
import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar'; // Import the Searchbar component
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api';

const Dashboard = () => {
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
    const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
    const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

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

    // Filter products based on search term and selected category
    useEffect(() => {
        const filtered = products.filter(product =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]); // Re-run filter whenever these change

    // Handle product search
    const handleSearch = (term) => {
        setSearchTerm(term); // Set the search term
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Set the selected category
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!barcode || !description || !price || !quantity || !category) {
            setError('Please fill in all fields.');
            return;
        }

        const productData = { barcode, description, price, quantity, category };

        try {
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
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            setSuccess('Product deleted successfully!');
        } catch (error) {
            setError(error.message);
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

    return (
        <Container className="mt-4">
            <h1 className="dashboard-title mb-4">Dashboard</h1>
            <Searchbar onSearch={handleSearch} /> {/* Pass search term directly */}

            {/* Category Filter Dropdown */}
            <Form.Group controlId="formBasicCategory" className="mb-4">
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

            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Product
            </Button>
            <div className="mt-4">
                {filteredProducts.length === 0 ? (
                    <p>No products available. Please add a product.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                )}
            </div>

            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProductId !== null ? 'Edit Product' : 'Add Product'}</Modal.Title>
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
