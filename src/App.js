import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Make sure this path is correct
import AddProduct from './pages/AddProduct'; // Adjust path as necessary
import ViewProducts from './pages/ViewProducts'; // Adjust path as necessary
import EditProduct from './pages/EditProduct'; // Adjust path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const handleLogin = () => {
        // Implement your login logic here
        console.log('User logged in');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/products" element={<ViewProducts />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
