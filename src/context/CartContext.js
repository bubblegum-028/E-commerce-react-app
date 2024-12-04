import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, addToCartAPI, updateCartAPI, removeFromCartAPI } from '../api'; // Import API methods
import { clearCartAPI } from '../api'; // Adjust path as needed

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, products, setProducts }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch cart items from the database on mount
    useEffect(() => {
        const loadCart = async () => {
            setLoading(true);
            try {
                const cartData = await fetchCart();
                setCart(cartData || []);
            } catch (err) {
                console.error('Failed to fetch cart:', err.message);
                setError('Unable to load cart items. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    // Add product to cart
    const addToCart = async (product) => {
        try {
            setLoading(true);
            await addToCartAPI(product.id, 1);

            // Immediately update the cart state
            const updatedCart = await fetchCart();
            setCart(updatedCart || []);

            // Decrement product stock
            if (setProducts) {
                setProducts((prevProducts) =>
                    prevProducts.map((p) =>
                        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
                    )
                );
            }
        } catch (err) {
            console.error('Failed to add to cart:', err.message || err);
            setError('Unable to add item to the cart.');
        } finally {
            setLoading(false);
        }
    };

    // Update product quantity in cart
    const updateQuantity = async (id, quantity) => {
        try {
            setLoading(true);
            await updateCartAPI(id, quantity);

            // Immediately update the cart state
            const updatedCart = await fetchCart();
            setCart(updatedCart || []);
        } catch (err) {
            console.error('Failed to update cart quantity:', err.message || err);
            setError('Unable to update item quantity in the cart.');
        } finally {
            setLoading(false);
        }
    };

    // Remove product from cart
    const removeFromCart = async (id) => {
        try {
            setLoading(true);
            await removeFromCartAPI(id);

            // Immediately update the cart state
            const updatedCart = await fetchCart();
            setCart(updatedCart || []);
        } catch (err) {
            console.error('Failed to remove item from cart:', err.message || err);
            setError('Unable to remove item from the cart.');
        } finally {
            setLoading(false);
        }
    };

    // Clear cart
// Clear cart
const clearCart = async () => {
    try {
        setLoading(true);
        await clearCartAPI(); // Clear the cart from the backend
        setCart([]); // Clear cart state locally
    } catch (err) {
        console.error('Failed to clear cart:', err.message || err);
        setError('Unable to clear the cart.');
    } finally {
        setLoading(false);
    }
};




    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
