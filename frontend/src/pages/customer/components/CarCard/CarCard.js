import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customer/cars/${car.id}`);
  };

  const getTransmissionIcon = (transmission) => {
    return transmission === 'Automatic' ? '⚡' : '🎛️';
  };

  const getFuelIcon = (fuelType) => {
    const icons = {
      'Petrol': '⛽',
      'Diesel': '🛢️',
      'Electric': '🔌',
      'Hybrid': '🔋'
    };
    return icons[fuelType] || '⛽';
  };

  return (
    <div className="car-card">
      <div className="car-image-container">
        <img 
          src={car.image} 
          alt={car.name}
          className="car-image"
          onError={(e) => {
            e.target.src = '/images/cars/car-placeholder.jpg';
          }}
        />
        {!car.available && (
          <div className="car-overlay">
            <span className="availability-badge unavailable">Not Available</span>
          </div>
        )}
        <div className="car-feature-badges">
          <span className="feature-badge transmission">
            {getTransmissionIcon(car.transmission)} {car.transmission}
          </span>
          <span className="feature-badge fuel">
            {getFuelIcon(car.fuelType)} {car.fuelType}
          </span>
        </div>
      </div>

      <div className="car-content">
        <div className="car-header">
          <h3 className="car-name">{car.name}</h3>
          <div className="car-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">{car.rating} ({car.reviews})</span>
          </div>
        </div>

        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-icon">👥</span>
            <span className="spec-text">{car.seats} Seats</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">🧳</span>
            <span className="spec-text">{car.luggage} Luggage</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">📍</span>
            <span className="spec-text">{car.location}</span>
          </div>
        </div>

        <div className="car-footer">
          <div className="price-section">
            <div className="price-main">
              <span className="price-amount">${car.price}</span>
              <span className="price-period">/day</span>
            </div>
            {car.originalPrice && (
              <div className="price-original">${car.originalPrice}</div>
            )}
          </div>
          <button 
            onClick={handleViewDetails}
            disabled={!car.available}
            className={`btn ${car.available ? 'btn-primary' : 'btn-disabled'}`}
          >
            {car.available ? 'View Details' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;