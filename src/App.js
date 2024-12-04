import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
import ViewProducts from './pages/ViewProducts';
import { fetchProducts } from './api'; // Ensure fetchProducts is imported

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]); // Add products state

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');

        if (token && userRole) {
            setIsLoggedIn(true);
            setRole(userRole);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const currentPath = window.location.pathname;
            localStorage.setItem('lastVisitedPath', currentPath);
        }
    }, [isLoggedIn]);

    // Fetch products on mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        loadProducts();
    }, []);

    const handleLogin = (userRole) => {
        setIsLoggedIn(true);
        setRole(userRole);
        localStorage.setItem('role', userRole);
        localStorage.setItem('token', 'dummyToken'); // Replace with actual token
        localStorage.removeItem('lastVisitedPath'); // Clear lastVisitedPath on login
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('lastVisitedPath');
        setIsLoggedIn(false);
        setRole('');
    };

    if (loading) {
        return <div className="text-center mt-5"><h3>Loading...</h3></div>;
    }

    // Determine redirect path based on role
    const lastVisitedPath = localStorage.getItem('lastVisitedPath');
    const defaultRedirectPath = !isLoggedIn
        ? '/login'
        : role === 'admin'
        ? '/dashboard'
        : '/products';

    return (
        <CartProvider products={products} setProducts={setProducts}>
            <Router>
                <Routes>
                    {/* Default Route */}
                    <Route
                        path="/"
                        element={<Navigate to={defaultRedirectPath} replace />}
                    />

                    {/* Login Route */}
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to={defaultRedirectPath} replace /> : <Login onLogin={handleLogin} />}
                    />

                    {/* Register Route */}
                    <Route path="/register" element={<Register />} />

                    {/* User Routes */}
                    {isLoggedIn && role === 'user' && (
                        <>
                            <Route path="/products" element={<ProductList />} />
                            <Route path="/product/:productId" element={<ProductDetails />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                        </>
                    )}

                    {/* Admin Routes */}
                    {isLoggedIn && role === 'admin' && (
                        <>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/view-products" element={<ViewProducts />} />
                        </>
                    )}

                    {/* Fallback Route */}
                    <Route
                        path="*"
                        element={<Navigate to={defaultRedirectPath} replace />}
                    />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
