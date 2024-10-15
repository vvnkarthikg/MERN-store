// src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Ensure axios is imported
import './Login.css';

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/signin', {
        email,
        password,
      });

      // Store the token in local storage
      localStorage.setItem('token', response.data.token);

      // Redirect to home page
      navigate('/'); // Redirect to home page on successful login
    } catch (err) {
      console.log('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        {/* Background image can go here */}
      </div>
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <p className="switch-text">Don't have an account? 
            <button type="button" onClick={onSwitchToSignup} className="switch-btn">Signup</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;