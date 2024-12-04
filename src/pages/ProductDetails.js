import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

const ProductDetails = () => {
  const { productId } = useParams(); // Get the productId from the URL params
  const [product, setProduct] = useState(null); // State for product details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${productId}`); // Fetch the product by ID
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        setProduct(productData); // Set the product data
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProduct(null); // Handle errors gracefully
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProductDetails();
  }, [productId]); // Run whenever productId changes

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h3>Product not found</h3>
        <Link to="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </div>
    );
  }

  // Ensure price is a valid number
  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">{product.description}</Card.Title>
              <Card.Text className="text-center">
                <strong>Price:</strong> ${price.toFixed(2)}<br />
                <strong>Stock:</strong> {product.quantity > 0 ? product.quantity : 'Out of Stock'}<br />
                <strong>Category:</strong> {product.category}<br />
                <strong>Description:</strong> {product.longDescription || 'No additional details available.'}
              </Card.Text>
              <div className="d-flex justify-content-center mt-4">
                <Link to="/products">
                  <Button variant="secondary">Back to Products</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
