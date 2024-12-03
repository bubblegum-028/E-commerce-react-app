import React from 'react'; // Import React
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import { Link } from 'react-router-dom'; // Import Link for navigating to product details page
import { useCart } from '../context/CartContext'; // Import CartContext for cart management

// ProductCard component: Displays product details with either Edit/Delete (admin) or View/Add to Cart (front store)
const ProductCard = ({ product, onEdit, onDelete }) => {
    const { addToCart, cart } = useCart(); // Access cart functions and cart state from the context

    // Check if the product is already in the cart
    const isInCart = cart.some((item) => item.id === product.id);

    const handleAddToCart = () => {
        addToCart(product); // Add the product to the cart
        alert(`${product.description} has been added to the cart!`);
    };

    return (
        <Card className="mb-3"> {/* Card component for displaying product information */}
            <Card.Body>
                <Card.Title>{product.description}</Card.Title> {/* Display product description */}
                <Card.Text>
                    <strong>Price:</strong> ${product.price}<br /> {/* Display product price */}
                    <strong>Stock:</strong> {product.quantity}<br /> {/* Display available quantity */}
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
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/product/${product.id}`}>
                            <Button variant="primary" className="me-2">View Product</Button>
                        </Link>
                        <Button
                            variant={isInCart ? "secondary" : "success"}
                            onClick={isInCart ? null : handleAddToCart}
                            disabled={isInCart}
                        >
                            {isInCart ? "In Cart" : "Add to Cart"}
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard; // Export the ProductCard component for use in other parts of the application
