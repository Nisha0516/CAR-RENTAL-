import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  useEffect(() => {
    // Mock data
    const mockCars = [
      {
        id: 1,
        name: 'Toyota Camry',
        model: 'Camry 2023',
        licensePlate: 'ABC123',
        status: 'available',
        dailyRate: 50,
        location: 'Downtown'
      },
      {
        id: 2,
        name: 'Honda Civic',
        model: 'Civic 2023',
        licensePlate: 'XYZ789',
        status: 'rented',
        dailyRate: 45,
        location: 'Airport'
      }
    ];
    setCars(mockCars);
  }, []);

  const handleAddCar = () => {
    setEditingCar(null);
    setShowForm(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== carId));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-row">
          <div>
            <h1>Manage Cars</h1>
            <p>Manage your car rental fleet</p>
          </div>
          <button className="btn-primary" onClick={handleAddCar}>
            + Add New Car
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-image">
              {/* Placeholder for car image */}
              <div className="car-image-placeholder">🚗</div>
            </div>
            <div className="car-info">
              <h3>{car.name}</h3>
              <p>{car.model}</p>
              <div className="car-details">
                <span>Plate: {car.licensePlate}</span>
                <span className={`status ${car.status}`}>{car.status}</span>
                <span>${car.dailyRate}/day</span>
                <span>Location: {car.location}</span>
              </div>
            </div>
            <div className="car-actions">
              <button 
                className="btn-secondary"
                onClick={() => handleEditCar(car)}
              >
                Edit
              </button>
              <button 
                className="btn-danger"
                onClick={() => handleDeleteCar(car.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Car Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingCar ? 'Edit Car' : 'Add New Car'}</h2>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Car Name</label>
                  <input type="text" defaultValue={editingCar?.name} />
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <input type="text" defaultValue={editingCar?.model} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>License Plate</label>
                  <input type="text" defaultValue={editingCar?.licensePlate} />
                </div>
                <div className="form-group">
                  <label>Daily Rate ($)</label>
                  <input type="number" defaultValue={editingCar?.dailyRate} />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingCar ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;