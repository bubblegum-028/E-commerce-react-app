// src/components/Searchbar.js
import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';

const Searchbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="d-flex mb-4">
            <FormControl
                type="text"
                placeholder="Search products..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
        </form>
    );
};

export default Searchbar;
