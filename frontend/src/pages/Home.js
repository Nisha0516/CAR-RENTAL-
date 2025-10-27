import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Car Rental System</h1>
      <p>Select your role to continue:</p>

      <div className="role-buttons">
        <Link to="/customer/login">Customer Login</Link>
        <Link to="/owner/login">Owner Login</Link>
        <Link to="/admin/login">Admin Login</Link>
      </div>
    </div>
  );
};

export default Home;
