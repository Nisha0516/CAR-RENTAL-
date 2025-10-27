# Car Rental Backend API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Install MongoDB
**Windows:**
- Download MongoDB from https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Default connection: `mongodb://localhost:27017`

**Or use MongoDB Atlas (Cloud):**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update `MONGODB_URI` in `.env`

### 3. Configure Environment
Update `.env` file with your settings

### 4. Start Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server will run at: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Cars
- `GET /api/cars` - Get all cars (Public)
- `GET /api/cars/:id` - Get single car (Public)
- `POST /api/cars` - Create car (Owner/Admin)
- `PUT /api/cars/:id` - Update car (Owner/Admin)
- `DELETE /api/cars/:id` - Delete car (Owner/Admin)

### Bookings
- `GET /api/bookings` - Get user's bookings (Protected)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `POST /api/bookings` - Create booking (Customer)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `DELETE /api/bookings/:id` - Cancel booking (Protected)
- `PUT /api/bookings/:id/approve` - Approve booking (Owner/Admin)
- `PUT /api/bookings/:id/reject` - Reject booking (Owner/Admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics (Admin)
- `GET /api/admin/bookings` - All bookings (Admin)
- `GET /api/admin/users` - All users (Admin)
- `GET /api/admin/cars` - All cars (Admin)
- `PUT /api/admin/cars/:id/approve` - Approve car (Admin)
- `GET /api/admin/reports` - Generate reports (Admin)

---

## 🧪 Testing with Postman/Thunder Client

### 1. Register User
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "customer",
  "drivingLicense": "DL123456"
}
```

### 2. Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes `token` - use this for protected routes

### 3. Get Cars (Public)
```http
GET http://localhost:5000/api/cars
```

### 4. Create Car (Protected - Owner)
```http
POST http://localhost:5000/api/cars
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Toyota Camry 2023",
  "type": "Sedan",
  "transmission": "Automatic",
  "fuel": "Petrol",
  "seats": 5,
  "price": 50,
  "location": "Downtown",
  "features": ["AC", "GPS", "Bluetooth"],
  "description": "Comfortable sedan for city driving"
}
```

### 5. Create Booking (Protected - Customer)
```http
POST http://localhost:5000/api/bookings
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "carId": "CAR_ID_HERE",
  "startDate": "2025-01-01",
  "endDate": "2025-01-05",
  "paymentMethod": "Card",
  "notes": "Need GPS"
}
```

---

## 📦 Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── models/
│   ├── User.js            # User model
│   ├── Car.js             # Car model
│   └── Booking.js         # Booking model
├── routes/
│   ├── auth.js            # Auth routes
│   ├── cars.js            # Car routes
│   ├── bookings.js        # Booking routes
│   └── admin.js           # Admin routes
├── controllers/
│   ├── authController.js      # Auth logic
│   ├── carController.js       # Car logic
│   ├── bookingController.js   # Booking logic
│   └── adminController.js     # Admin logic
├── middleware/
│   └── auth.js            # JWT authentication
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── server.js             # Entry point
└── package.json          # Dependencies

```

---

## 🔒 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## ✅ Backend Complete!

Your backend is now ready with:
- ✅ User authentication (JWT)
- ✅ Role-based access (Customer, Owner, Admin)
- ✅ Car management
- ✅ Booking system
- ✅ Admin dashboard
- ✅ MongoDB integration

**Next Step:** Install dependencies and start the server!
```bash
npm install
npm run dev
```
