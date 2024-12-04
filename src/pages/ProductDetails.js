import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { productId } = useParams();  // Get the productId from the URL params
  const [product, setProduct] = useState(null);  // State for product details

  useEffect(() => {
    // Debugging: Log productId and products
    console.log("Product ID from URL:", productId);
    console.log("Products list:", products);

    // Find the product by ID from products array
    const foundProduct = products.find((prod) => prod.id === parseInt(productId));
    setProduct(foundProduct);  // Set the found product to state
  }, [productId, products]);  // Re-run whenever productId or products change

  if (!product) return <p>Product not found</p>;  // Show error message if product not found

  return (
    <div>
      <h1>{product.description}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.quantity} available</p>
      <p>Category: {product.category}</p>
      {/* Add other product details as needed */}
    </div>
  );
};

export default ProductDetails;
