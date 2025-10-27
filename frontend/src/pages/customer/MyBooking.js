import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../../services/api';
import CustomerLayout from './CustomerLayout';
import './MyBooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingsAPI.getBookings();
      console.log('Fetched bookings:', response);
      
      // Transform API data to match component format
      const transformedBookings = (response.bookings || []).map(booking => ({
        id: booking._id || booking.id,
        carName: booking.car?.name || 'Car',
        image: booking.car?.images?.[0] || '🚗',
        startDate: booking.startDate ? new Date(booking.startDate).toLocaleDateString() : 'N/A',
        endDate: booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A',
        status: booking.status || 'pending',
        total: booking.totalPrice || 0,
        ownerName: booking.owner?.name || 'Owner',
        paymentMethod: booking.paymentMethod || 'N/A',
        days: booking.days || Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))
      }));
      
      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to localStorage or mock data
      const savedBookings = JSON.parse(localStorage.getItem('customerBookings') || '[]');
      if (savedBookings.length > 0) {
        setBookings(savedBookings);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.cancelBooking(bookingId);
        alert('Booking cancelled successfully');
        // Refresh bookings list
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert(error.message || 'Failed to cancel booking');
      }
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <CustomerLayout>
      <div className="my-bookings-page">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p>Manage and track your car rental bookings</p>
        </div>

        <div className="bookings-stats">
          <div className="stat-card">
            <span className="stat-number">{bookings.length}</span>
            <span className="stat-label">Total Bookings</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{bookings.filter(b => b.status === 'pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{bookings.filter(b => b.status === 'confirmed').length}</span>
            <span className="stat-label">Confirmed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{bookings.filter(b => b.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="booking-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({bookings.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>

        <div className="bookings-list">
          {loading ? (
            <div className="empty-bookings">
              <div className="empty-icon">⏳</div>
              <h3>Loading your bookings...</h3>
              <p>Please wait while we fetch your booking history</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="empty-bookings">
              <div className="empty-icon">📋</div>
              <h3>No {filter !== 'all' ? filter : ''} bookings found</h3>
              <p>Start exploring our amazing car collection!</p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/customer/home')}
              >
                Browse Cars
              </button>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-car">
                    <div className="car-image-small">{booking.image || '🚗'}</div>
                    <div className="car-info-text">
                      <h3>{booking.carName}</h3>
                      <p className="booking-id">Booking ID: #{booking.id}</p>
                      <p className="owner-name">Owner: {typeof booking.ownerName === 'string' ? booking.ownerName : 'Owner'}</p>
                    </div>
                  </div>
                  <div className="booking-status-section">
                    <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <div className="detail-column">
                      <span className="detail-label">📅 Start Date</span>
                      <span className="detail-value">{booking.startDate}</span>
                    </div>
                    <div className="detail-column">
                      <span className="detail-label">📅 End Date</span>
                      <span className="detail-value">{booking.endDate}</span>
                    </div>
                    <div className="detail-column">
                      <span className="detail-label">⏱️ Duration</span>
                      <span className="detail-value">{booking.days} days</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-column">
                      <span className="detail-label">💳 Payment Method</span>
                      <span className="detail-value">{booking.paymentMethod?.toUpperCase()}</span>
                    </div>
                    <div className="detail-column">
                      <span className="detail-label">💰 Total Amount</span>
                      <span className="detail-value booking-total">${booking.total}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-actions">
                  {booking.status === 'pending' && (
                    <div className="pending-message">
                      ⏳ Waiting for owner approval
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <>
                      <div className="confirmed-message">
                        ✅ Booking confirmed! You can pick up the car on {booking.startDate}
                      </div>
                      <button 
                        className="btn-cancel"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                  {booking.status === 'completed' && (
                    <div className="completed-message">
                      🎉 Trip completed! Thank you for choosing us.
                    </div>
                  )}
                  {booking.status === 'cancelled' && (
                    <div className="cancelled-message">
                      ❌ This booking was cancelled
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default MyBooking;