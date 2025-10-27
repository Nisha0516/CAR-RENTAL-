import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';
import './Booking.css';

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const mockCar = {
      id: carId,
      name: 'Toyota Camry 2023',
      price: 50,
      image: '🚗'
    };
    setCar(mockCar);
  }, [carId]);

  const handleBooking = () => {
    alert('Booking confirmed!');
    navigate('/customer/my-bookings');
  };

  if (!car) return <div>Loading...</div>;

  return (
    <CustomerLayout>
      <div className="booking-page">
        <div className="booking-container">
          <h1>Complete Your Booking</h1>
          
          <div className="booking-summary">
            <div className="car-info-booking">
              <div className="car-image-small">{car.image}</div>
              <div>
                <h3>{car.name}</h3>
                <p>${car.price}/day</p>
              </div>
            </div>
            
            <div className="booking-details">
              <h3>Booking Details</h3>
              <div className="detail-row">
                <span>Start Date:</span>
                <span>2024-01-15</span>
              </div>
              <div className="detail-row">
                <span>End Date:</span>
                <span>2024-01-20</span>
              </div>
              <div className="detail-row total">
                <span>Total Price:</span>
                <span>$250</span>
              </div>
            </div>
          </div>

          <button onClick={handleBooking} className="btn-primary large">
            Confirm Booking
          </button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Booking;