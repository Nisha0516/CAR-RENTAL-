import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarCard.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customer/booking/${car._id || car.id}`, {
      state: { car: car }
    });
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

  // Get car image (support both image and images array)
  const carImage = car.images?.[0] || car.image || '🚗';
  const isImageEmoji = carImage.length <= 2;

  return (
    <div className="car-card">
      <div className="car-image-container">
        {isImageEmoji ? (
          <div className="car-image-placeholder">
            <span className="car-emoji">{carImage}</span>
          </div>
        ) : (
          <img 
            src={carImage} 
            alt={car.name}
            className="car-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        )}
        <div className="car-image-fallback" style={{ display: 'none' }}>
          <span className="car-emoji">🚗</span>
        </div>
        
        {!car.available && (
          <div className="car-overlay">
            <span className="availability-badge unavailable">Not Available</span>
          </div>
        )}
        
        {car.type && (
          <div className="car-type-badge">{car.type}</div>
        )}
      </div>

      <div className="car-content">
        <div className="car-header">
          <h3 className="car-name">{car.name}</h3>
          {car.owner && (
            <p className="car-owner">
              <span className="owner-icon">👤</span> 
              {car.owner.name || 'Car Rental'}
            </p>
          )}
        </div>

        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-icon">{getTransmissionIcon(car.transmission)}</span>
            <span className="spec-text">{car.transmission || 'Auto'}</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">{getFuelIcon(car.fuel || car.fuelType)}</span>
            <span className="spec-text">{car.fuel || car.fuelType || 'Petrol'}</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">👥</span>
            <span className="spec-text">{car.seats || 4} Seats</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">📍</span>
            <span className="spec-text">{car.location || 'City'}</span>
          </div>
        </div>

        <div className="car-footer">
          <div className="price-section">
            <div className="price-main">
              <span className="price-amount">₹{car.price}</span>
              <span className="price-period">/day</span>
            </div>
          </div>
          <button 
            onClick={handleViewDetails}
            disabled={!car.available}
            className={`btn-book ${car.available ? '' : 'btn-disabled'}`}
          >
            {car.available ? '📅 Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;