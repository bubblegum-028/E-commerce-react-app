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



// Fetch cart items for the authenticated user
export const fetchCart = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched Cart:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error in fetchCart:', error.message);
        throw error;
    }
};








export const addToCartAPI = async (productId, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is sent
            },
            body: JSON.stringify({ product_id: productId, quantity }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error Details:', errorDetails);
            throw new Error(`Failed to add to cart: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Add to Cart Response:', data);
        return data;
    } catch (error) {
        console.error('Error in addToCartAPI:', error.message);
        throw error;
    }
};



export const updateCartAPI = async (cartItemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return await response.json();
};

export const removeFromCartAPI = async (cartItemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return await response.json();
};

