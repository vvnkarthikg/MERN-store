import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaSearch, FaShoppingCart } from 'react-icons/fa'; // Import icons
import logo from './/images/logo.png';


const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token on logout
        navigate('/auth'); // Redirect to auth page after logout
    };

    const handleOrdersClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        if (!token) {
            alert('Please log in to view your orders.'); // Show alert if not logged in
            navigate('/auth'); // Redirect to login page
        } else {
            navigate('/orders'); // Redirect to orders page if logged in
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="nothing" />
                <p className="navbar-title">SRI GANESH AGENCIES</p>
            </div>
            <form className="search-container">
                <input type="text" placeholder="Search..." className="search-input" />
                <button type="submit" className="search-button"><FaSearch /></button>
            </form>
            <ul className="navbar-links">
                <li><Link to="/"><FaHome /> Home</Link></li>
                <li><a href="/orders" onClick={handleOrdersClick}><FaShoppingCart /> Orders</a></li>
                {token ? (
                    <>
                        <li><Link to="/profile"><FaUser /> Profile</Link></li>
                        <li><Link to="/" onClick={handleLogout}><FaSignOutAlt /> Logout</Link></li> {/* Use Link here */}
                    </>
                ) : (
                    <li><Link to="/auth"><FaSignInAlt /> Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;


