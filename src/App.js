import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';  // Products listing page
import ProductDetails from './pages/ProductDetails';  // Product details page
import Dashboard from './pages/Dashboard';  // Admin Dashboard
import CartPage from './pages/CartPage';  // Cart page
import CheckoutPage from './pages/CheckoutPage';  // Checkout page
import { CartProvider } from './context/CartContext';  // Cart context provider

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    console.log('User Role from LocalStorage:', userRole); // Debugging

    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Default route based on login status */}
          <Route
            path="/"
            element={isLoggedIn ? (
              role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/products" />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={isLoggedIn ? (
              role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/products" />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          />

          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          {isLoggedIn && role === 'user' && (
            <>
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </>
          )}

          {/* Admin Routes */}
          {isLoggedIn && role === 'admin' && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={isLoggedIn ? (role === 'admin' ? '/dashboard' : '/products') : '/login'} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;