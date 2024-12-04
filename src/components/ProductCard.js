import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const { addToCart } = useCart(); // Access the addToCart function from context

    const handleAddToCart = async () => {
        try {
            await addToCart(product); // Add product to cart
            alert(`${product.description} has been added to the cart!`);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add the product to the cart. Please try again.');
        }
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{product.description}</Card.Title>
                <Card.Text>
                    <strong>Price:</strong> ${parseFloat(product.price || 0).toFixed(2)}<br />
                    <strong>Stock:</strong> {product.quantity > 0 ? product.quantity : 'Out of Stock'}<br />
                    <strong>Category:</strong> {product.category}
                </Card.Text>

                {onEdit && onDelete ? (
                    <>
                        <Button variant="secondary" onClick={() => onEdit(product)}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(product.id)} className="ms-2">
                            Delete
                        </Button>
                    </>
                ) : (
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/product/${product.id}`}>
                            <Button variant="primary" className="me-2">View Product</Button>
                        </Link>
                        <Button
                            variant="success"
                            onClick={handleAddToCart}
                            disabled={product.quantity <= 0}
                        >
                            Add to Cart
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
