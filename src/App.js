// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ViewProducts from './pages/ViewProducts';
import EditProduct from './pages/EditProduct';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
                />
                <Route 
                    path="/dashboard" 
                    element={isLoggedIn ? <Dashboard products={products} setProducts={setProducts} /> : <Navigate to="/" />} 
                />
                <Route 
                    path="/products" 
                    element={isLoggedIn ? <ViewProducts products={products} setProducts={setProducts} /> : <Navigate to="/" />} 
                />
                <Route 
                    path="/edit/:id" 
                    element={isLoggedIn ? <EditProduct products={products} setProducts={setProducts} /> : <Navigate to="/" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
