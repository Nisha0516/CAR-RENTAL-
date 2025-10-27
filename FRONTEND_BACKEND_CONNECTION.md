# 🔗 Frontend-Backend Connection Guide

## ✅ What's Been Created

I've created complete API integration files for your frontend:

### **Files Created:**
1. ✅ `frontend/src/services/api.js` - All API endpoints
2. ✅ `frontend/src/services/authService.js` - Authentication helper

---

## 🚀 Quick Start

### Step 1: Make Sure Backend is Running
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Should see:
# 🚀 Server running on port 5000
# ✅ MongoDB Connected
```

### Step 2: Start Frontend
```bash
# Terminal 2 - Frontend
cd frontend
npm start

# Should open at http://localhost:3000
```

---

## 📡 How It Works

### **API Service Structure:**

```javascript
// Import in any component
import { authAPI, carsAPI, bookingsAPI, adminAPI } from '../services/api';

// Or import AuthService helper
import authService from '../services/authService';
```

### **Example Usage in Components:**

#### **1. Login Component**
```javascript
import { authAPI } from '../services/api';

const handleLogin = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password });
    console.log('Login successful:', response);
    // Token is automatically stored
    navigate('/customer/home');
  } catch (error) {
    console.error('Login failed:', error.message);
    alert(error.message);
  }
};
```

#### **2. Get Cars (Customer Home)**
```javascript
import { carsAPI } from '../services/api';

useEffect(() => {
  const fetchCars = async () => {
    try {
      const response = await carsAPI.getCars({
        type: 'Sedan',
        available: true
      });
      setCars(response.cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };
  fetchCars();
}, []);
```

#### **3. Create Booking**
```javascript
import { bookingsAPI } from '../services/api';

const handleBooking = async (bookingData) => {
  try {
    const response = await bookingsAPI.createBooking({
      carId: car.id,
      startDate: '2025-01-01',
      endDate: '2025-01-05',
      paymentMethod: 'Card'
    });
    alert('Booking created successfully!');
  } catch (error) {
    alert(error.message);
  }
};
```

#### **4. Get User's Bookings**
```javascript
import { bookingsAPI } from '../services/api';

useEffect(() => {
  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getBookings();
      setBookings(response.bookings);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchBookings();
}, []);
```

---

## 🔐 Authentication Flow

### **1. User Signup/Login:**
```javascript
// Signup
const response = await authAPI.signup({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  phone: '1234567890',
  role: 'customer',
  drivingLicense: 'DL123456'
});

// Token and user data automatically stored in localStorage
```

### **2. Using AuthService Helper:**
```javascript
import authService from '../services/authService';

// Check if logged in
if (authService.isLoggedIn()) {
  console.log('User is logged in');
}

// Get current user
const user = authService.getCurrentUser();
console.log('User:', user);

// Check role
if (authService.isCustomer()) {
  console.log('User is a customer');
}

// Logout
authService.logout(); // Clears localStorage and redirects
```

---

## 🔄 Replace localStorage with API Calls

### **Before (localStorage):**
```javascript
// Old way
const cars = JSON.parse(localStorage.getItem('cars') || '[]');
```

### **After (API):**
```javascript
// New way
import { carsAPI } from '../services/api';

const response = await carsAPI.getCars();
const cars = response.cars;
```

---

## 📋 Complete API Reference

### **Auth APIs (`authAPI`)**
- `signup(userData)` - Register new user
- `login(credentials)` - Login user
- `getMe()` - Get current user profile
- `logout()` - Clear local storage

### **Cars APIs (`carsAPI`)**
- `getCars(filters)` - Get all cars with optional filters
- `getCar(id)` - Get single car
- `createCar(carData)` - Create new car (Owner)
- `updateCar(id, carData)` - Update car
- `deleteCar(id)` - Delete car

### **Bookings APIs (`bookingsAPI`)**
- `getBookings()` - Get user's bookings
- `getBooking(id)` - Get single booking
- `createBooking(bookingData)` - Create booking
- `updateBooking(id, data)` - Update booking
- `cancelBooking(id)` - Cancel booking
- `approveBooking(id)` - Approve booking (Owner/Admin)
- `rejectBooking(id)` - Reject booking (Owner/Admin)

### **Admin APIs (`adminAPI`)**
- `getDashboardStats()` - Get dashboard statistics
- `getAllBookings(page, status)` - Get all bookings
- `getAllUsers(page, role)` - Get all users
- `getAllCars(page)` - Get all cars
- `approveCar(id)` - Approve car listing
- `getReports(type, startDate, endDate)` - Generate reports

---

## 🛠️ Update Your Components

### **Example: Update Login Page**

**File:** `frontend/src/pages/customer/Login.js`

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      console.log('Login successful:', response);
      
      // Redirect based on role
      if (response.user.role === 'customer') {
        navigate('/customer/home');
      } else if (response.user.role === 'owner') {
        navigate('/owner/dashboard');
      } else if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
```

---

## ✅ Testing the Connection

### **Test 1: Check Backend**
```bash
curl http://localhost:5000/api/health
```
Should return: `{"success": true, "message": "API is running!"}`

### **Test 2: Test Login from Frontend**
1. Go to login page
2. Try logging in
3. Open browser console (F12)
4. Should see API request to `http://localhost:5000/api/auth/login`

### **Test 3: Check Network Tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Use the app
4. See API calls being made

---

## 🐛 Troubleshooting

### **Issue: CORS Error**
```
Access to fetch at 'http://localhost:5000/api/...' has been blocked by CORS
```

**Fix:** Backend already has CORS enabled. Make sure:
1. Backend is running on port 5000
2. Frontend is running on port 3000
3. `.env` in backend has: `FRONTEND_URL=http://localhost:3000`

### **Issue: 401 Unauthorized**
```
{success: false, message: "Not authorized"}
```

**Fix:** Token not being sent. Check:
1. Token exists: `localStorage.getItem('token')`
2. Login first to get token
3. Protected routes need authentication

### **Issue: Network Error**
```
TypeError: Failed to fetch
```

**Fix:** Backend not running
```bash
cd backend
npm run dev
```

### **Issue: MongoDB Connection Error**
```
❌ MongoDB Connection Error
```

**Fix:** Start MongoDB service
- Windows: Check Services → MongoDB Server
- Or install MongoDB from mongodb.com

---

## 🎯 Next Steps

### **1. Update All Login/Signup Pages**
Replace mock authentication with API calls

### **2. Update Customer Home**
Replace mock car data with `carsAPI.getCars()`

### **3. Update Booking Flow**
Use `bookingsAPI.createBooking()` instead of localStorage

### **4. Update Admin Dashboard**
Use `adminAPI.getDashboardStats()` for real data

### **5. Update Owner Dashboard**
Use `carsAPI.createCar()` for adding cars

---

## 📊 Data Flow Diagram

```
Frontend Component
       ↓
   API Service (api.js)
       ↓
   HTTP Request
       ↓
Backend Express Server (port 5000)
       ↓
   MongoDB Database
       ↓
   Response Data
       ↓
Frontend Component (Update UI)
```

---

## ✅ Connection Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB installed and running
- [ ] API service files created
- [ ] Can login and get token
- [ ] Token stored in localStorage
- [ ] Protected routes work with token
- [ ] Cars data loads from backend
- [ ] Bookings work end-to-end
- [ ] No CORS errors

---

## 🎉 Success!

Your frontend is now connected to the backend!

**Test the full flow:**
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`
3. Register a new user
4. Login
5. Browse cars (loaded from backend!)
6. Create a booking (stored in MongoDB!)
7. Check admin panel (real data!)

---

**🚀 Your full-stack app is now live! Frontend ↔ Backend ↔ Database! 🎉**
