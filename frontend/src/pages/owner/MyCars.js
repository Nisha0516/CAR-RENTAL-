import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCars.css";

function MyCars({ cars, setCars }) {
  const navigate = useNavigate();

  const deleteCar = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
    }
  };

  const toggleCarStatus = (id) => {
    setCars(cars.map(car => 
      car.id === id 
        ? { ...car, status: car.status === 'available' ? 'maintenance' : 'available' }
        : car
    ));
  };

  const editCar = (car) => {
    // For now, navigate to add-cars and show a message
    // In a real app, you would pass the car data to edit
    navigate('/owner/dashboard');
    alert(`Edit functionality for ${car.carModel} would open here`);
  };

  return (
    <section className="my-cars-section">
      <div className="section-header">
        <h3>Your Car Inventory</h3>
        <p>Manage your fleet of {cars.length} cars</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/owner/dashboard')}
        >
          + Add New Car
        </button>
      </div>
      
      <div className="car-grid">
        {cars.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🚗</div>
            <h4>No cars added yet</h4>
            <p>Start by adding your first car to the fleet</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/owner/dashboard')}
            >
              Add Your First Car
            </button>
          </div>
        ) : (
          cars.map((car) => (
            <div className={`car-card ${car.status}`} key={car.id}>
              <div className="car-image">
                {car.imageURL ? (
                  <img src={car.imageURL} alt={car.carModel} />
                ) : (
                  <div className="image-placeholder">🚗</div>
                )}
                <div className="car-status">{car.status}</div>
              </div>
              
              <div className="car-info">
                <h4>{car.carModel}</h4>
                <div className="car-details">
                  <span className="car-number">{car.carNumber}</span>
                  <span className="car-type">{car.carType}</span>
                </div>
                <div className="car-specs">
                  <span>🎨 {car.carColor}</span>
                  <span>⛽ {car.fuelType}</span>
                  <span>⚙️ {car.transmission}</span>
                  {car.seats && <span>👥 {car.seats} seats</span>}
                </div>
                <div className="car-price">
                  <strong>₹{car.pricePerDay}</strong>
                  <span>/ day</span>
                </div>
                <div className="car-location">
                  <span>📍 {car.location || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="car-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => editCar(car)}
                >
                  Edit
                </button>
                <button 
                  className={`btn btn-status ${car.status === 'available' ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => toggleCarStatus(car.id)}
                >
                  {car.status === 'available' ? 'Mark Maintenance' : 'Mark Available'}
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => deleteCar(car.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MyCars;