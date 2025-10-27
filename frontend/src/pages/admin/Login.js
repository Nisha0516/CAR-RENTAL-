import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      localStorage.setItem('adminToken', 'mock-jwt-token');
      navigate('/admin/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-content">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Access your car rental administration panel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="admin@yourcompany.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              placeholder="Enter your admin password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>
          
          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>Need help? <a href="/support">Contact System Administrator</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;