import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';  // Products listing page
import ProductDetails from './pages/ProductDetails';  // Product details page
import Dashboard from './pages/Dashboard';  // Admin Dashboard

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [role, setRole] = useState(''); // Track the role of the logged-in user

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    console.log('User Role from LocalStorage:', userRole);  // Debugging line

    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole); // Set the role of the logged-in user
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root path based on login status */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to={role === 'admin' ? '/dashboard' : '/products'} /> : <Navigate to="/login" />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to={role === 'admin' ? '/dashboard' : '/products'} /> : <Login onLogin={handleLogin} />}
        />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Protected Routes for logged-in users */}
        {isLoggedIn && (
          <>
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </>
        )}

        {/* Protected Route for Admin */}
        {isLoggedIn && role === 'admin' && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
