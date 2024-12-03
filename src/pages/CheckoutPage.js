import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        paymentMethod: 'COD',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    const handleCheckout = () => {
        alert('Order placed successfully!');
        clearCart();
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleCheckout}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={shippingInfo.paymentMethod}
                        onChange={handleInputChange}
                    >
                        <option value="COD">Cash on Delivery</option>
                        <option value="Card">Credit/Debit Card</option>
                    </select>
                </div>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
