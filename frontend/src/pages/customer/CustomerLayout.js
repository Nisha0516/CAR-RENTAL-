import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './CustomerLayout.css';

const CustomerLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Function to load user data
    const loadUserData = () => {
      const userData = localStorage.getItem('customerData') || localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // Only set user if they are a customer (not owner/admin)
          if (!parsedUser.role || parsedUser.role === 'customer') {
            setUser(parsedUser);
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        setUser(null);
      }
    };

    // Load on mount
    loadUserData();

    // Listen for storage events (updates from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'customerData') {
        loadUserData();
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerData');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/customer/login');
  };

  // Check for both token types
  const isLoggedIn = localStorage.getItem('customerToken') || localStorage.getItem('token');

  return (
    <div className="customer-layout-new">
      {/* Modern Floating Navbar */}
      <header className={`customer-header-new ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container-new">
          <div className="header-content">
            <div className="logo-new" onClick={() => navigate('/customer/home')}>
              <div className="logo-icon-new">🚙</div>
              <span className="logo-text-new">
                <span className="logo-drive">Drive</span>
                <span className="logo-easy">Easy</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <Link 
                to="/customer/home" 
                className={`nav-link ${location.pathname === '/customer/home' ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
              {isLoggedIn && (
                <>
                  <Link 
                    to="/customer/my-bookings" 
                    className={`nav-link ${location.pathname === '/customer/my-bookings' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">📋</span>
                    My Bookings
                  </Link>
                  <Link 
                    to="/customer/profile" 
                    className={`nav-link ${location.pathname === '/customer/profile' ? 'active' : ''}`}
                  >
                    <span className="nav-icon">👤</span>
                    Profile
                  </Link>
                </>
              )}
            </nav>

            {/* User Actions */}
            <div className="user-actions">
              {isLoggedIn ? (
                <div className="user-menu">
                  <div className="user-info">
                    <span className="user-name">
                      Hello, {user && typeof user === 'object' ? (user.name || 'User') : 'User'}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                    <span className="nav-icon">🚪</span>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-actions">
                  <Link to="/customer/login" className="btn btn-ghost btn-sm">
                    Login
                  </Link>
                  <Link to="/customer/signup" className="btn btn-primary btn-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link 
              to="/customer/home" 
              className={`nav-link ${location.pathname === '/customer/home' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link 
                  to="/customer/my-bookings" 
                  className={`nav-link ${location.pathname === '/customer/my-bookings' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">📋</span>
                  My Bookings
                </Link>
                <Link 
                  to="/customer/profile" 
                  className={`nav-link ${location.pathname === '/customer/profile' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">👤</span>
                  Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="nav-link logout-mobile"
                >
                  <span className="nav-icon">🚪</span>
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link 
                  to="/customer/login" 
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">🔑</span>
                  Login
                </Link>
                <Link 
                  to="/customer/signup" 
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">📝</span>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="customer-main">
        {children}
      </main>

      <footer className="customer-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>DriveFlex</h3>
            <p>Your trusted partner for car rentals. Find the perfect vehicle for your journey.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/customer/home">Browse Cars</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ support@driveflex.com</p>
            <p>📍 123 Rental St, City, State</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 DriveFlex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;