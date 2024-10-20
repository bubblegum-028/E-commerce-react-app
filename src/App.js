import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Custom CSS
import Login from './pages/Login'; // Assuming Login is in pages folder
import Dashboard from './pages/Dashboard'; // Assuming Dashboard is in pages folder

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleLogin = () => {
        setIsLoggedIn(true); // Update state when user logs in
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
                    element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} // Redirect to login if not logged in
                />
            </Routes>
        </Router>
    );
};

export default App;
