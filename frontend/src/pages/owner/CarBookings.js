import React, { useState, useEffect } from "react";
import { ownerAPI } from '../../services/api';
import "./CarBookings.css";

function CarBookings({ cars }) {
  const [filter, setFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await ownerAPI.getMyBookings();
      setBookings(response.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to sample data
      const sampleBookings = [
        {
          id: 1,
          carId: 1,
          customerName: "Amit Sharma",
          customerPhone: "+91 9876543210",
          carModel: "Toyota Innova",
          carNumber: "KA01AB1234",
          startDate: "2024-02-15",
          endDate: "2024-02-18",
          totalDays: 3,
          totalAmount: 4500,
          status: "pending",
          bookingDate: "2024-02-10"
        },
        {
          id: 2,
          carId: 2,
          customerName: "Priya Patel",
          customerPhone: "+91 9876543211",
          carModel: "Hyundai Creta",
          carNumber: "KA01CD5678",
          startDate: "2024-02-20",
          endDate: "2024-02-22",
          totalDays: 2,
          totalAmount: 6000,
          status: "confirmed",
          bookingDate: "2024-02-12"
        },
        {
          id: 3,
          carId: 3,
          customerName: "Rahul Verma",
          customerPhone: "+91 9876543212",
          carModel: "Maruti Swift",
          carNumber: "KA01EF9012",
          startDate: "2024-02-25",
          endDate: "2024-02-28",
          totalDays: 3,
          totalAmount: 3000,
          status: "completed",
          bookingDate: "2024-02-08"
        }
      ];
      setBookings(sampleBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      if (action === 'confirmed') {
        await ownerAPI.approveBooking(bookingId);
      } else if (action === 'cancelled') {
        await ownerAPI.rejectBooking(bookingId);
      } else if (action === 'completed') {
        await ownerAPI.completeBooking(bookingId);
      }
      alert(`Booking ${action} successfully!`);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      alert(error.message || 'Failed to update booking');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'success';
      case 'completed': return 'primary';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  return (
    <section className="bookings-section">
      <div className="section-header">
        <h3>Booking Requests</h3>
        <p>Manage all booking requests for your cars</p>
        
        <div className="booking-filters">
          <button 
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({bookings.length})
          </button>
          <button 
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button 
            className={`filter-btn ${filter === "confirmed" ? "active" : ""}`}
            onClick={() => setFilter("confirmed")}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button 
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>
      </div>
      
      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h4>No bookings found</h4>
            <p>There are no {filter !== "all" ? filter : ""} bookings at the moment</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div className={`booking-card ${booking.status}`} key={booking.id}>
              <div className="booking-header">
                <div className="booking-info">
                  <h4>{booking.carModel}</h4>
                  <span className="car-number">{booking.carNumber}</span>
                </div>
                <div className={`booking-status status-${getStatusColor(booking.status)}`}>
                  {booking.status.toUpperCase()}
                </div>
              </div>
              
              <div className="booking-details">
                <div className="customer-info">
                  <strong>{booking.customerName}</strong>
                  <span>{booking.customerPhone}</span>
                </div>
                
                <div className="booking-dates">
                  <div className="date-group">
                    <span className="label">Pickup</span>
                    <span className="value">{booking.startDate}</span>
                  </div>
                  <div className="date-group">
                    <span className="label">Return</span>
                    <span className="value">{booking.endDate}</span>
                  </div>
                  <div className="date-group">
                    <span className="label">Days</span>
                    <span className="value">{booking.totalDays}</span>
                  </div>
                </div>
                
                <div className="booking-amount">
                  <span className="label">Total Amount</span>
                  <span className="amount">₹{booking.totalAmount}</span>
                </div>
              </div>
              
              <div className="booking-actions">
                {booking.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-success"
                      onClick={() => handleBookingAction(booking.id, 'confirmed')}
                    >
                      Accept
                    </button>
                    <button 
                      className="btn btn-error"
                      onClick={() => handleBookingAction(booking.id, 'cancelled')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleBookingAction(booking.id, 'completed')}
                  >
                    Mark Complete
                  </button>
                )}
                {(booking.status === 'completed' || booking.status === 'cancelled') && (
                  <span className="action-complete">
                    {booking.status === 'completed' ? 'Trip Completed' : 'Booking Cancelled'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CarBookings;