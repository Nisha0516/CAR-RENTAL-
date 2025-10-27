import React, { useState } from "react";
import "./AddCars.css";

function AddCars({ cars, setCars }) {
  const [formData, setFormData] = useState({
    carModel: "",
    carNumber: "",
    pricePerDay: "",
    carColor: "",
    carYear: "",
    carType: "",
    seats: "",
    fuelType: "petrol",
    transmission: "manual",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addCar = (e) => {
    e.preventDefault();
    const newCar = { 
      ...formData, 
      id: Date.now(),
      status: 'available',
      createdAt: new Date().toLocaleDateString()
    };

    if (newCar.image) {
      newCar.imageURL = URL.createObjectURL(newCar.image);
    }

    setCars([...cars, newCar]);
    resetForm();
    alert("Car added successfully!");
  };

  const resetForm = () => {
    setFormData({
      carModel: "",
      carNumber: "",
      pricePerDay: "",
      carColor: "",
      carYear: "",
      carType: "",
      seats: "",
      fuelType: "petrol",
      transmission: "manual",
      location: "",
      image: null,
    });
  };

  return (
    <section className="add-cars-section">
      <div className="form-card">
        <h3>Add a New Car</h3>
        <form onSubmit={addCar} className="car-form">
          <div className="form-row">
            <div className="form-group">
              <label>Car Model *</label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                placeholder="e.g., Toyota Innova"
                required
              />
            </div>
            <div className="form-group">
              <label>Car Number *</label>
              <input
                type="text"
                name="carNumber"
                value={formData.carNumber}
                onChange={handleChange}
                placeholder="e.g., KA01AB1234"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price per Day (₹) *</label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="e.g., 1500"
                required
              />
            </div>
            <div className="form-group">
              <label>Car Type *</label>
              <select name="carType" value={formData.carType} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="luxury">Luxury</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="carColor"
                value={formData.carColor}
                onChange={handleChange}
                placeholder="e.g., Red"
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="carYear"
                value={formData.carYear}
                onChange={handleChange}
                placeholder="e.g., 2022"
                min="2000"
                max="2024"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Seats</label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="e.g., 5"
                min="2"
                max="12"
              />
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="cng">CNG</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange}>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bangalore"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Car Image *</label>
            <div className="file-input-container">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="file-input"
                required
              />
              <label className="file-input-label">
                <span>📁 Choose Car Image</span>
                <small>PNG, JPG, JPEG up to 5MB</small>
              </label>
            </div>
            {formData.image && (
              <div className="image-preview">
                <img src={URL.createObjectURL(formData.image)} alt="Preview" />
                <span>{formData.image.name}</span>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Car
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddCars;