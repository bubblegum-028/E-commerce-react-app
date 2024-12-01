import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find((prod) => prod.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId, products]);

  if (!product) return <p>Product not found</p>;

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