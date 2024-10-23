// src/components/ProductCard.js
import React from 'react'; // Import React
import { Card, Button } from 'react-bootstrap'; // Import necessary components from react-bootstrap

// ProductCard component: Displays product details and provides Edit and Delete functionality
const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <Card className="mb-3"> {/* Card component for displaying product information */}
            <Card.Body>
                <Card.Title>{product.description}</Card.Title> {/* Display product description */}
                <Card.Text>
                    <strong>Barcode:</strong> {product.barcode}<br /> {/* Display product barcode */}
                    <strong>Price:</strong> ${product.price}<br /> {/* Display product price */}
                    <strong>Quantity:</strong> {product.quantity}<br /> {/* Display available quantity */}
                    <strong>Category:</strong> {product.category} {/* Display product category */}
                </Card.Text>
                {/* Button to trigger the edit action, passing the product as an argument */}
                <Button variant="secondary" onClick={() => onEdit(product)}>
                    Edit
                </Button>
                {/* Button to trigger the delete action, passing the product's ID as an argument */}
                <Button variant="danger" onClick={() => onDelete(product.id)} className="ms-2">
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard; // Export the ProductCard component for use in other parts of the application
