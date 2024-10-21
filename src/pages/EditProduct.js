// src/pages/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = ({ products, setProducts }) => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();

    // State for the product details
    const [product, setProduct] = useState({
        name: '',
        barcode: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    });

    // Fetch the product details based on the ID
    useEffect(() => {
        const foundProduct = products.find((p) => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [id, products]);

    // Handle form submission to update the product
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProducts = products.map((p) =>
            p.id === product.id ? product : p
        );
        setProducts(updatedProducts); // Update the product list
        navigate('/dashboard'); // Redirect back to the dashboard
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Barcode</label>
                    <input
                        type="text"
                        name="barcode"
                        value={product.barcode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
