import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ViewProducts from './pages/ViewProducts';
import EditProduct from './pages/EditProduct';
import ProductList from './pages/ProductList';  // Import ProductList page for public view
import ProductDetails from './pages/ProductDetails';  // Import ProductDetails page for product details

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    const [products, setProducts] = useState([]);

    // Function to handle login status and persist the state
    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // Persist login state
    };

    // Fetch products on mount (for public pages)
    useEffect(() => {
        // Fetch all products (or from your API)
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products'); // Adjust API endpoint if needed
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public Route for Product List (Front Store) */}
                <Route path="/" element={<ProductList products={products} />} /> 

                {/* Public Route for Product Details */}
                <Route path="/product/:productId" element={<ProductDetails products={products} />} />

                {/* Authenticated Route for Login */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/dashboard" replace />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />

                {/* Authenticated Routes for Admin Dashboard */}
                {isLoggedIn && (
                    <>
                        <Route
                            path="/dashboard"
                            element={<Dashboard products={products} setProducts={setProducts} />}
                        />
                        <Route
                            path="/products"
                            element={<ViewProducts products={products} setProducts={setProducts} />}
                        />
                        <Route
                            path="/edit/:id"
                            element={<EditProduct products={products} setProducts={setProducts} />}
                        />
                    </>
                )}

                {/* Fallback route for unauthenticated access */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
