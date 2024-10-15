import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Products.css';
import banner from '../images/banner1.png';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <>

<section className="banner-image">
      <img src={banner} alt="Banner Image"/>
     </section>

     <div className="home-container">
      {/* Add your banner image here */}
     
      {error && <p className="error-text">{error}</p>}
      <div className="prod-list">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map(product => (
            <Link key={product._id} to={`/products/${product.productId}`} style={{ textDecoration: 'none' }}>
              <div className="prod-card">
                <div className="prod-image">
                  <img
                    src={product.productImage ? `http://localhost:5000/${product.productImage}` : 'http://localhost:5000/default-placeholder.png'}
                    alt={product.name}
                  />
                </div>
                <div className="prod-details">
                  <h3>{product.name}</h3>
                  <p className="prod-price">₹{product.price}</p>
                  <p className="prod-quantity">{product.quantity} left</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>

    </>
    
  );
};

export default Products;