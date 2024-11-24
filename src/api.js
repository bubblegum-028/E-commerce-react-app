const API_BASE_URL = 'http://localhost:8000/api'; // Change this to your production URL when deployed

// Fetch all products with optional search and category filters
export const fetchProducts = async (searchTerm = '', category = '') => {
    const params = new URLSearchParams();
    
    // Add search term to parameters if provided
    if (searchTerm) {
        params.append('search', searchTerm);
    }
    
    // Add category to parameters if provided
    if (category) {
        params.append('category', category);
    }

    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
};

// Fetch a single product by its ID
export const fetchProductById = async (productId) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
};

// Add a new product
export const addProduct = async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
};

// Update an existing product
export const updateProduct = async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
};

// Delete a product
export const deleteProduct = async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return await response.json();
};
