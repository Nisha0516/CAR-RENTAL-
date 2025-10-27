import React, { useState, useEffect } from 'react';
import CustomerLayout from './CustomerLayout';
import CarCard from './components/CarCard/CarCard';
import SearchFilter from './components/SearchFilter/SearchFilter';
import './Home.css';

const CustomerHome = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    priceRange: '',
    transmission: '',
    fuelType: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCars = [
        {
          id: 1,
          name: 'Toyota Camry 2023',
          image: '/images/cars/toyota-camry.jpg',
          type: 'Sedan',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          luggage: 2,
          price: 45,
          originalPrice: 55,
          rating: 4.8,
          reviews: 127,
          location: 'Downtown',
          available: true,
          features: ['Bluetooth', 'Air Conditioning', 'GPS', 'Backup Camera']
        },
        {
          id: 2,
          name: 'Honda Civic 2023',
          image: '/images/cars/honda-civic.jpg',
          type: 'Sedan',
          transmission: 'Manual',
          fuelType: 'Petrol',
          seats: 5,
          luggage: 2,
          price: 40,
          rating: 4.6,
          reviews: 89,
          location: 'Airport',
          available: true,
          features: ['Bluetooth', 'Air Conditioning', 'Sunroof']
        },
        {
          id: 3,
          name: 'Ford Mustang 2023',
          image: '/images/cars/ford-mustang.jpg',
          type: 'Sports',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 4,
          luggage: 1,
          price: 75,
          rating: 4.9,
          reviews: 203,
          location: 'City Center',
          available: false,
          features: ['Leather Seats', 'Premium Sound', 'Sport Mode']
        },
        {
          id: 4,
          name: 'Tesla Model 3',
          image: '/images/cars/tesla-model3.jpg',
          type: 'Electric',
          transmission: 'Automatic',
          fuelType: 'Electric',
          seats: 5,
          luggage: 2,
          price: 65,
          rating: 4.7,
          reviews: 156,
          location: 'Business District',
          available: true,
          features: ['Autopilot', 'Premium Interior', 'Supercharging']
        },
        {
          id: 5,
          name: 'BMW X5',
          image: '/images/cars/bmw-x5.jpg',
          type: 'SUV',
          transmission: 'Automatic',
          fuelType: 'Diesel',
          seats: 7,
          luggage: 3,
          price: 85,
          rating: 4.5,
          reviews: 94,
          location: 'Shopping Mall',
          available: true,
          features: ['Panoramic Roof', 'Heated Seats', 'Parking Assist']
        },
        {
          id: 6,
          name: 'Mercedes C-Class',
          image: '/images/cars/mercedes-cclass.jpg',
          type: 'Luxury',
          transmission: 'Automatic',
          fuelType: 'Petrol',
          seats: 5,
          luggage: 2,
          price: 70,
          rating: 4.8,
          reviews: 112,
          location: 'Uptown',
          available: true,
          features: ['Leather Interior', 'Premium Sound', 'Ambient Lighting']
        }
      ];
      setCars(mockCars);
      setFilteredCars(mockCars);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    let filtered = cars;

    // Search filter
    if (newFilters.search) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        car.location.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }

    // Type filter
    if (newFilters.type) {
      filtered = filtered.filter(car => car.type === newFilters.type);
    }

    // Transmission filter
    if (newFilters.transmission) {
      filtered = filtered.filter(car => car.transmission === newFilters.transmission);
    }

    // Fuel type filter
    if (newFilters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === newFilters.fuelType);
    }

    // Price range filter
    if (newFilters.priceRange) {
      const [min, max] = newFilters.priceRange.split('-').map(Number);
      filtered = filtered.filter(car => car.price >= min && car.price <= max);
    }

    setFilteredCars(filtered);
  };

  const availableCarsCount = filteredCars.filter(car => car.available).length;

  return (
    <CustomerLayout>
      <div className="customer-home">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background">
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Find Your Perfect
                <span className="hero-highlight"> Ride</span>
              </h1>
              <p className="hero-subtitle">
                Discover the best cars for your journey at unbeatable prices. 
                From economy to luxury, we have the perfect vehicle for every adventure.
              </p>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Car Models</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="search-section">
          <div className="container">
            <SearchFilter 
              filters={filters}
              onFilterChange={handleFilterChange}
              carCount={availableCarsCount}
            />
          </div>
        </section>

        {/* Cars Section */}
        <section className="cars-section">
          <div className="container">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Finding the best cars for you...</p>
              </div>
            ) : (
              <>
                <div className="section-header">
                  <h2>Available Cars ({availableCarsCount})</h2>
                  <p>Choose from our carefully selected fleet of vehicles</p>
                </div>

                {filteredCars.length > 0 ? (
                  <div className="cars-grid">
                    {filteredCars.map(car => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🚗</div>
                    <h3>No cars found</h3>
                    <p>Try adjusting your search criteria to find more options.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleFilterChange({
                        search: '',
                        type: '',
                        priceRange: '',
                        transmission: '',
                        fuelType: ''
                      })}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose DriveFlex?</h2>
              <p>Experience the difference with our premium rental service</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Booking</h3>
                <p>Your information is protected with bank-level security encryption.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Best Prices</h3>
                <p>Guaranteed competitive pricing with no hidden fees or charges.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3>Full Insurance</h3>
                <p>Comprehensive insurance coverage included with every rental.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Instant Confirmation</h3>
                <p>Get immediate booking confirmation with real-time availability.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CustomerLayout>
  );
};

export default CustomerHome;