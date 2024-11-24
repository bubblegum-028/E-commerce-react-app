// src/components/ProductCard.js
import React from 'react'; // Import React
import { Card, Button } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import { Link } from 'react-router-dom'; // Import Link for navigating to product details page

// ProductCard component: Displays product details with either Edit/Delete (admin) or View/Add to Cart (front store)
const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <Card className="mb-3"> {/* Card component for displaying product information */}
            <Card.Body>
                <Card.Title>{product.description}</Card.Title> {/* Display product description */}
                <Card.Text>
                    <strong>Price:</strong> ${product.price}<br /> {/* Display product price */}
                    <strong>Quantity:</strong> {product.quantity}<br /> {/* Display available quantity */}
                    <strong>Category:</strong> {product.category} {/* Display product category */}
                </Card.Text>

                {/* Admin view: Edit and Delete buttons */}
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
                    // Front store view: View Product and Add to Cart buttons
                    <>
                        <Link to={`/product/${product.id}`}>
                            <Button variant="primary" className="me-2">View Product</Button>
                        </Link>
                        <Button variant="success" onClick={() => alert(`Added ${product.description} to cart!`)}>
                            Add to Cart
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard; // Export the ProductCard component for use in other parts of the application
