import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';
import './MyBooking.css';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockBookings = [
      {
        id: 1,
        car: 'Toyota Camry 2023',
        image: '🚗',
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        status: 'confirmed',
        total: 250
      },
      {
        id: 2,
        car: 'Honda Civic 2023',
        image: '🚙',
        startDate: '2024-02-01',
        endDate: '2024-02-05',
        status: 'completed',
        total: 180
      }
    ];
    setBookings(mockBookings);
  }, []);

  return (
    <CustomerLayout>
      <div className="my-bookings-page">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p>Manage your car rental bookings</p>
        </div>

        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div className="booking-car">
                  <div className="car-image-small">{booking.image}</div>
                  <div>
                    <h3>{booking.car}</h3>
                    <p>Booking ID: #{booking.id}</p>
                  </div>
                </div>
                <div className="booking-status">
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-column">
                  <h4>Rental Period</h4>
                  <p>{booking.startDate} to {booking.endDate}</p>
                </div>
                <div className="detail-column">
                  <h4>Total Amount</h4>
                  <p className="booking-total">${booking.total}</p>
                </div>
              </div>

              <div className="booking-actions">
                <button className="btn-secondary">
                  View Details
                </button>
                {booking.status === 'confirmed' && (
                  <button className="btn-warning">
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default MyBooking;