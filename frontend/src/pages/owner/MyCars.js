import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ownerAPI } from '../../services/api';
import "./MyCars.css";

function MyCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCars();
  }, []);

  const fetchMyCars = async () => {
    setLoading(true);
    try {
      const response = await ownerAPI.getMyCars();
      console.log('Fetched owner cars:', response);
      setCars(response.cars || response.data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      alert('Failed to fetch cars: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await ownerAPI.deleteCar(id);
        setCars(cars.filter((car) => car._id !== id));
        alert("Car deleted successfully!");
      } catch (error) {
        alert(error.message || 'Failed to delete car');
      }
    }
  };

  const toggleCarStatus = async (id) => {
    try {
      const car = cars.find(c => c._id === id);
      const newAvailability = !car.available;
      await ownerAPI.updateCarAvailability(id, newAvailability);
      setCars(cars.map(car => 
        car._id === id 
          ? { ...car, available: newAvailability }
          : car
      ));
      alert('Car status updated!');
    } catch (error) {
      alert(error.message || 'Failed to update status');
    }
  };

  const editCar = (car) => {
    // For now, navigate to add-cars and show a message
    // In a real app, you would pass the car data to edit
    navigate('/owner/dashboard');
    alert(`Edit functionality for ${car.name} would open here`);
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
            <div className={`car-card ${car.approved ? (car.available ? 'available' : 'unavailable') : 'pending'}`} key={car._id}>
              <div className="car-image">
                {car.images && car.images[0] ? (
                  <img src={car.images[0]} alt={car.name} />
                ) : (
                  <div className="image-placeholder">🚗</div>
                )}
                <div className="car-status">
                  {car.approved ? (car.available ? 'Available' : 'Unavailable') : 'Pending Approval'}
                </div>
              </div>
              
              <div className="car-info">
                <h4>{car.name}</h4>
                <div className="car-details">
                  <span className="car-type">{car.type}</span>
                  {car.approved && <span className="approved-badge">✓ Approved</span>}
                  {!car.approved && <span className="pending-badge">⏳ Pending</span>}
                </div>
                <div className="car-specs">
                  <span>⛽ {car.fuel}</span>
                  <span>⚙️ {car.transmission}</span>
                  {car.seats && <span>👥 {car.seats} seats</span>}
                </div>
                <div className="car-price">
                  <strong>₹{car.price}</strong>
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
                  disabled={!car.approved}
                >
                  Edit
                </button>
                <button 
                  className={`btn btn-status ${car.available ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => toggleCarStatus(car._id)}
                  disabled={!car.approved}
                >
                  {car.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => deleteCar(car._id)}
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