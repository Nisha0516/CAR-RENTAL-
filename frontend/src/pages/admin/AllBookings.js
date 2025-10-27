import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock data
    const mockBookings = [
      {
        id: 1,
        customer: 'John Doe',
        car: 'Toyota Camry',
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        status: 'active',
        total: 250
      },
      {
        id: 2,
        customer: 'Jane Smith',
        car: 'Honda Civic',
        startDate: '2024-01-18',
        endDate: '2024-01-25',
        status: 'completed',
        total: 320
      }
    ];
    setBookings(mockBookings);
  }, []);

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-active',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
      pending: 'status-pending'
    };
    return <span className={`status-badge ${statusClasses[status]}`}>{status}</span>;
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>All Bookings</h1>
        <p>Manage and monitor all rental bookings</p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>#{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.car}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{getStatusBadge(booking.status)}</td>
                <td>${booking.total}</td>
                <td>
                  <button className="btn-primary">View</button>
                  <button className="btn-secondary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;