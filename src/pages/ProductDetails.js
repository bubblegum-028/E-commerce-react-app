import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Assuming you have a CartContext
import { fetchProductById } from '../api'; // Assuming this is an API call to fetch product by ID

const ProductDetails = () => {  
  const {productId} = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { addToCart } = useCart(); // For adding to the cart
  const navigate = useNavigate(); // For navigating to other pages

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetchProductById(productId); // Fetch product by ID from API
        if (response) {
          setProduct(response); // Set the product if found
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details');
      }
    };

    getProductDetails();
  }, [productId]); // Re-fetch product when ID changes

  const handleAddToCart = async () => {
    try {
      await addToCart(product); // Add the product to the cart
      alert(`${product.description} has been added to the cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add the product to the cart. Please try again.');
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>; // Show error if fetching fails
  }

  if (!product) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{product.description}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> ${parseFloat(product.price || 0).toFixed(2)}<br />
            <strong>Stock:</strong> {product.quantity > 0 ? product.quantity : 'Out of Stock'}<br />
            <strong>Category:</strong> {product.category}<br />
            <strong>Description:</strong> {product.full_description}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="success" onClick={handleAddToCart} disabled={product.quantity <= 0}>
              Add to Cart
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back to Products
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetails;
