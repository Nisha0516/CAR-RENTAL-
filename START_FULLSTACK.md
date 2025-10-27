# 🚀 Quick Start - Full Stack Application

## Start Everything in 3 Commands

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
✅ MongoDB Connected: localhost
📊 Database: car-rental
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

### Terminal 3: Test API Connection
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Car Rental API is running!",
  "timestamp": "2025-10-27..."
}
```

---

## ✅ What's Connected

✅ **Frontend** (React) → Port 3000  
✅ **Backend** (Express) → Port 5000  
✅ **Database** (MongoDB) → Port 27017  
✅ **API Services** → Created  
✅ **Authentication** → JWT Ready  

---

## 🧪 Test the Full Flow

### 1. **Open Browser:** http://localhost:3000

### 2. **Register New User:**
- Click "Signup"
- Fill form (use role: customer)
- Submit
- Check browser console - should see API call

### 3. **Login:**
- Email: your_email
- Password: your_password
- Should redirect to customer home

### 4. **Browse Cars:**
- Customer home should load (currently mock data)
- Check console - ready for API integration

### 5. **Check Browser DevTools:**
- Press F12
- Go to **Network** tab
- See API calls to `http://localhost:5000/api/...`
- Go to **Application** tab → **Local Storage**
- Should see `token` and `user` stored

---

## 📁 Files Created for Integration

1. ✅ `frontend/src/services/api.js` - All API endpoints
2. ✅ `frontend/src/services/authService.js` - Auth helper
3. ✅ `backend/` - Complete backend (17 files)

---

## 🔗 API Endpoints Available

### Auth (Public)
- POST `/api/auth/signup` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get user (Protected)

### Cars (Public GET, Protected POST/PUT/DELETE)
- GET `/api/cars` - List all cars
- GET `/api/cars/:id` - Single car
- POST `/api/cars` - Create (Owner/Admin)
- PUT `/api/cars/:id` - Update
- DELETE `/api/cars/:id` - Delete

### Bookings (All Protected)
- GET `/api/bookings` - User's bookings
- POST `/api/bookings` - Create booking
- PUT `/api/bookings/:id/approve` - Approve
- PUT `/api/bookings/:id/reject` - Reject
- DELETE `/api/bookings/:id` - Cancel

### Admin (Admin Only)
- GET `/api/admin/stats` - Dashboard stats
- GET `/api/admin/bookings` - All bookings
- GET `/api/admin/users` - All users
- GET `/api/admin/cars` - All cars

---

## 🎯 Quick Test Commands

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"password123\",\"phone\":\"1234567890\",\"role\":\"customer\",\"drivingLicense\":\"DL123\"}"
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"password123\"}"
```

Save the `token` from response!

### Test Get Cars (with token)
```bash
curl http://localhost:5000/api/cars \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔧 If Something Doesn't Work

### Backend Won't Start
```bash
# Check MongoDB is running
# Windows: Services → MongoDB Server

# Or install MongoDB
# Download from: https://www.mongodb.com/try/download/community
```

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in backend/.env
```

### CORS Error
```bash
# Make sure backend .env has:
FRONTEND_URL=http://localhost:3000

# Restart backend after changing .env
```

### Frontend Can't Connect
```bash
# Check backend is running on port 5000
# Check frontend API_BASE_URL in src/services/api.js
# Should be: http://localhost:5000/api
```

---

## 📊 What You Have Now

```
┌─────────────────────────────────────┐
│  Frontend (React)                   │
│  http://localhost:3000              │
│  - Landing Page                     │
│  - Customer Module                  │
│  - Owner Module                     │
│  - Admin Module                     │
└──────────┬──────────────────────────┘
           │ API Calls
           ↓
┌─────────────────────────────────────┐
│  Backend (Express)                  │
│  http://localhost:5000/api          │
│  - Authentication (JWT)             │
│  - Cars Management                  │
│  - Booking System                   │
│  - Admin Panel                      │
└──────────┬──────────────────────────┘
           │ Mongoose
           ↓
┌─────────────────────────────────────┐
│  Database (MongoDB)                 │
│  mongodb://localhost:27017          │
│  - Users Collection                 │
│  - Cars Collection                  │
│  - Bookings Collection              │
└─────────────────────────────────────┘
```

---

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts and opens browser
- [ ] Health check returns success
- [ ] Can register new user
- [ ] Can login and get token
- [ ] Token stored in localStorage
- [ ] API calls visible in Network tab
- [ ] MongoDB connected
- [ ] No CORS errors

---

## 🎉 You're Ready!

Your **complete full-stack car rental application** is now running:

✅ React frontend with modern UI  
✅ Express backend with RESTful API  
✅ MongoDB database for data persistence  
✅ JWT authentication & authorization  
✅ Role-based access control  
✅ Complete booking system  

**Start both servers and test it now! 🚗💨**

---

## 📚 Documentation

- **Frontend-Backend Connection:** `FRONTEND_BACKEND_CONNECTION.md`
- **Backend API:** `backend/README.md`
- **Backend Complete Guide:** `BACKEND_COMPLETE_GUIDE.md`
- **Testing Guide:** `COMPLETE_TESTING_GUIDE.md`

---

**Happy Coding! 🚀**
