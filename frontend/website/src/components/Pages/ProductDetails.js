// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuantityModal from './QuantityModal'; // Import the QuantityModal component
import './ProductDetails.css'; // Import the CSS file for styles

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State variables for modal visibility and quantity input
    const [showModal, setShowModal] = useState(false); 
    const [quantityInputValue, setQuantityInputValue] = useState(1);
    
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleOrderNow = () => {
        const token = localStorage.getItem('token'); // Check if user is logged in
        if (!token) {
            alert('Please log in to place an order.'); // Alert if not logged in
            navigate('/auth'); // Redirect to login page
        } else {
            setShowModal(true); // Open modal if logged in
        }
    };

    const handleQuantityConfirm = async (quantity) => {
        try {
            const token = localStorage.getItem('token'); // Get token from local storage
            await axios.post(`http://localhost:5000/orders/`, { quantity,id:product._id }, {
                headers: { Authorization: `Bearer ${token}` } // Set authorization header
            });
            alert('Order placed successfully!'); // Show success message
            navigate('/orders'); // Redirect to orders page
        } catch (err) {
            alert('Failed to place order. Please try again.');
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="product-details">
            {product ? (
                <div className="product-layout">
                    <img src={`http://localhost:5000/${product.productImage}`} alt={product.name} className="product-image" />
                    <div className="product-info">
                        <h1 className="product-name">{product.name}</h1>
                        <p className="product-price"><span>₹{product.price}</span></p>
                        <p className="product-quantity">Available: <span>{product.quantity}</span></p>
                        <p className="product-category">Category: <span>{product.category}</span></p>
                        <button className="add-to-cart">Add to Cart</button>
                        <button className="buy-now" onClick={handleOrderNow}>Order Now</button> {/* Open modal on click */}
                        <div className="product-description">
                            <h3>Description</h3>
                            <p>This is a detailed description of the product. It provides information about the features, specifications, and any other relevant details that may help the customer make a purchase decision.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No product details available.</p>
            )}

            {/* Render the quantity modal */}
            <QuantityModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                onConfirm={handleQuantityConfirm} 
                quantityInputValue={quantityInputValue}
                setQuantityInputValue={setQuantityInputValue}
            />
        </div>
    );
};

export default ProductDetails;