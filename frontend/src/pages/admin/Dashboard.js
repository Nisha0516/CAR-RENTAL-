import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeRentals: 0,
    totalRevenue: 0,
    availableCars: 0
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalBookings: 156,
      activeRentals: 23,
      totalRevenue: 45280,
      availableCars: 45
    });
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to your car rental management system</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <h3>Active Rentals</h3>
            <p className="stat-number">{stats.activeRentals}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-number">${stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🅿️</div>
          <div className="stat-info">
            <h3>Available Cars</h3>
            <p className="stat-number">{stats.availableCars}</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-badge new">New</span>
            <p>New booking #1234 created</p>
            <span className="activity-time">2 minutes ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-badge completed">Completed</span>
            <p>Booking #1230 completed</p>
            <span className="activity-time">1 hour ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-badge warning">Warning</span>
            <p>Car #5 needs maintenance</p>
            <span className="activity-time">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;