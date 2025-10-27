import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";
import AddCars from "./AddCars";
import MyCars from "./MyCars";
import CarBookings from "./CarBookings";
import "./Dashboard.css";

function OwnerDashboard() {  // Component name is OwnerDashboard
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [ownerProfile, setOwnerProfile] = useState({
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@driveeasy.com",
    phone: "+91 9876543210",
    address: "123 MG Road, Bangalore, Karnataka",
    joinDate: "2024-01-15",
    totalCars: 0,
    totalEarnings: 0,
    rating: 4.8,
    profilePicture: null,
    profilePictureUrl: null,
    companyName: "Rajesh Auto Rentals",
    aadharNumber: "XXXX-XXXX-1234",
    licenseNumber: "KA01-2020-123456",
    bankAccount: "XXXX-XXXX-1234",
    ifscCode: "SBIN0000123"
  });

  const [stats, setStats] = useState({
    totalCars: 0,
    activeBookings: 0,
    totalEarnings: 0,
    completedBookings: 0
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('add-cars')) setActiveTab('addCars');
    else if (path.includes('my-cars')) setActiveTab('myCars');
    else if (path.includes('bookings')) setActiveTab('bookings');
    else setActiveTab('profile');
  }, [location]);

  useEffect(() => {
    setStats({
      totalCars: cars.length,
      activeBookings: bookings.filter(booking => booking.status === 'confirmed').length,
      totalEarnings: bookings
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => sum + booking.totalAmount, 0),
      completedBookings: bookings.filter(booking => booking.status === 'completed').length
    });

    setOwnerProfile(prev => ({
      ...prev,
      totalCars: cars.length,
      totalEarnings: bookings
        .filter(booking => booking.status === 'completed')
        .reduce((sum, booking) => sum + booking.totalAmount, 0)
    }));
  }, [cars, bookings]);

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    navigate('/owner/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // For now, we'll just change the tab state since we're not using URL routing internally
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile ownerProfile={ownerProfile} setOwnerProfile={setOwnerProfile} />;
      case 'addCars':
        return <AddCars cars={cars} setCars={setCars} />;
      case 'myCars':
        return <MyCars cars={cars} setCars={setCars} />;
      case 'bookings':
        return <CarBookings bookings={bookings} setBookings={setBookings} cars={cars} />;
      default:
        return <Profile ownerProfile={ownerProfile} setOwnerProfile={setOwnerProfile} />;
    }
  };

  return (
    <div className="owner-dashboard">
      <aside className="owner-sidebar">
        <div className="sidebar-header">
          <h2>Owner Portal</h2>
          <p>Manage your cars & bookings</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => handleTabChange('profile')}
            >
              <span>👤 My Profile</span>
            </li>
            <li 
              className={activeTab === "addCars" ? "active" : ""}
              onClick={() => handleTabChange('addCars')}
            >
              <span>📝 Add Car</span>
            </li>
            <li 
              className={activeTab === "myCars" ? "active" : ""}
              onClick={() => handleTabChange('myCars')}
            >
              <span>🚗 My Cars ({stats.totalCars})</span>
            </li>
            <li 
              className={activeTab === "bookings" ? "active" : ""}
              onClick={() => handleTabChange('bookings')}
            >
              <span>📋 Bookings ({stats.activeBookings})</span>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {ownerProfile.profilePictureUrl ? (
                <img src={ownerProfile.profilePictureUrl} alt="Profile" />
              ) : (
                ownerProfile.name.charAt(0)
              )}
            </div>
            <div className="user-details">
              <strong>{ownerProfile.name}</strong>
              <span>{ownerProfile.email}</span>
            </div>
          </div>
          <button className="btn btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="owner-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>
              {activeTab === "profile" && "My Profile"}
              {activeTab === "addCars" && "Add New Car"}
              {activeTab === "myCars" && "My Cars"}
              {activeTab === "bookings" && "Bookings"}
            </h1>
            <div className="header-stats">
              <div className="stat-card">
                <span className="stat-number">{stats.totalCars}</span>
                <span className="stat-label">Total Cars</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{stats.activeBookings}</span>
                <span className="stat-label">Active Bookings</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">₹{stats.totalEarnings}</span>
                <span className="stat-label">Total Earnings</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
}

// FIX: Change this from 'Dashboard' to 'OwnerDashboard'
export default OwnerDashboard; // ✅ This should match the component name