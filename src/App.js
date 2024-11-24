import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditProduct from './pages/EditProduct';
import UserRegistration from './pages/UserRegistration';
import ProductList from './pages/ProductList';

const App = () => {
    const [user, setUser] = useState(null); // Store user details (e.g., name, role)
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [products, setProducts] = useState([]); // Manage product list state

    // Handle user login
    const handleLogin = (userDetails) => {
        setUser(userDetails); // Set user data
        setIsLoggedIn(true);  // Update login status
    };

    // Handle user logout
    const handleLogout = () => {
        setUser(null);       // Clear user data
        setIsLoggedIn(false); // Update login status
    };

    return (
        <Router>
            <Routes>
                {/* Registration Page */}
                <Route path="/register" element={<UserRegistration />} />
                
                {/* Login Page */}
                <Route 
                    path="/" 
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
                />
                
                {/* Dashboard */}
                <Route 
                    path="/dashboard" 
                    element={
                        isLoggedIn ? 
                        <Dashboard products={products} setProducts={setProducts} onLogout={handleLogout} /> : 
                        <Navigate to="/" />
                    } 
                />
                
                {/* Product List */}
                <Route 
                    path="/products" 
                    element={
                        isLoggedIn ? 
                        <ProductList products={products} /> : 
                        <Navigate to="/" />
                    } 
                />
                
                {/* Edit Product */}
                <Route 
                    path="/edit/:id" 
                    element={
                        isLoggedIn ? 
                        <EditProduct products={products} setProducts={setProducts} /> : 
                        <Navigate to="/" />
                    } 
                />
                
                {/* Fallback for invalid routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
