import React, { useEffect, useState } from 'react';
import { Container, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap'; // Importing necessary components from React-Bootstrap
import ProductCard from '../components/ProductCard'; // Custom component for displaying individual products
import Searchbar from '../components/Searchbar'; // Custom component for search functionality
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api'; // Importing API functions for CRUD operations
import { useNavigate } from 'react-router-dom'; // Hook for navigating between routes in the app

const Dashboard = () => {
    // Array of available product categories for easy maintenance
    const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"];
    
    // State variables
    const [products, setProducts] = useState([]); // Stores the list of all products
    const [showModal, setShowModal] = useState(false); // Controls the visibility of the modal for adding/editing a product
    const [barcode, setBarcode] = useState(''); // Stores the barcode input
    const [description, setDescription] = useState(''); // Stores the product description
    const [price, setPrice] = useState(''); // Stores the product price
    const [quantity, setQuantity] = useState(''); // Stores the product quantity
    const [category, setCategory] = useState(''); // Stores the selected product category
    const [error, setError] = useState(''); // Stores any error messages
    const [success, setSuccess] = useState(''); // Stores success messages
    const [editingProductId, setEditingProductId] = useState(null); // Tracks the product being edited
    const [filteredProducts, setFilteredProducts] = useState([]); // Stores the filtered list of products based on search/category
    const [selectedCategory, setSelectedCategory] = useState(''); // Tracks the selected category for filtering
    const [searchTerm, setSearchTerm] = useState(''); // Stores the search term input
    const [loading, setLoading] = useState(false); // Tracks loading state
    const navigate = useNavigate(); // Hook for navigation

    // Fetch products from the API when the component mounts
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true); // Start loading
            try {
                const productsData = await fetchProducts(); // Fetching product data
                setProducts(productsData); // Setting the fetched products
                setFilteredProducts(productsData); // Initially displaying all products
            } catch (error) {
                setError(error.message); // Handling error in case of failure
            } finally {
                setLoading(false); // Stop loading
            }
        };
        loadProducts(); // Call the function to fetch products
    }, []); // Empty dependency array ensures this runs only once

    // Filtering products based on search term and selected category
    useEffect(() => {
        const filtered = products.filter(product =>
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true) // Filter by selected category if provided
        );
        setFilteredProducts(filtered); // Update the filtered products state
    }, [searchTerm, selectedCategory, products]); // Runs whenever the search term or selected category changes

    // Handles the search input change
    const handleSearch = (term) => {
        setSearchTerm(term); // Update search term
    };

    // Handles category filter change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Update selected category
    };

    // Handles the form submission for adding/editing products
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!barcode || !description || !price || !quantity || !category) {
            setError('Please fill in all fields.'); // Display error if any field is empty
            return;
        }

        const productData = { barcode, description, price, quantity, category }; // Product data object to send to the API

        try {
            setLoading(true); // Start loading during API call
            if (editingProductId !== null) {
                // If editing an existing product
                await updateProduct(editingProductId, productData); // Call API to update the product
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editingProductId ? { ...product, ...productData } : product
                    )
                );
                setSuccess('Product updated successfully!');
            } else {
                // If adding a new product
                const newProduct = await addProduct(productData); // Call API to add a new product
                setProducts((prevProducts) => [...prevProducts, newProduct]); // Add the new product to the list
                setSuccess('Product added successfully!');
            }
        } catch (error) {
            setError(error.message); // Set error message if the API call fails
        } finally {
            setLoading(false); // Stop loading after the API call completes
        }

        setError(''); // Reset error after submission
        resetForm(); // Reset the form fields and close the modal
    };

    // Handles editing an existing product
    const handleEdit = (product) => {
        setEditingProductId(product.id); // Set the ID of the product being edited
        setBarcode(product.barcode); // Set the barcode for the form
        setDescription(product.description); // Set the description for the form
        setPrice(product.price); // Set the price for the form
        setQuantity(product.quantity); // Set the quantity for the form
        setCategory(product.category); // Set the category for the form
        setShowModal(true); // Show the modal to edit the product
    };

    // Handles deleting a product
    const handleDelete = async (id) => {
        try {
            setLoading(true); // Start loading during the deletion process
            await deleteProduct(id); // Call API to delete the product
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // Remove the product from the list
            setSuccess('Product deleted successfully!');
        } catch (error) {
            setError(error.message); // Set error message if deletion fails
        } finally {
            setLoading(false); // Stop loading after deletion
        }
    };

    // Resets the form fields and closes the modal
    const resetForm = () => {
        setShowModal(false); // Close the modal
        setBarcode(''); // Reset barcode field
        setDescription(''); // Reset description field
        setPrice(''); // Reset price field
        setQuantity(''); // Reset quantity field
        setCategory(''); // Reset category field
        setEditingProductId(null); // Reset editing product ID
    };

    // Handles logout functionality by removing the token from localStorage
    const handleLogout = () => {
        localStorage.removeItem('userToken'); // Remove token from localStorage for logout
        navigate('/'); // Redirect to login page
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
