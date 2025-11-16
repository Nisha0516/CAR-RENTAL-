const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/advanced', require('./routes/adminAdvanced'));
app.use('/api/owner', require('./routes/owner'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Car Rental API is running!',
    timestamp: new Date().toISOString()
  });
});

// TEMPORARY ROUTE - Create test owner account
// Visit: http://localhost:5000/api/create-owner to create account
// Comment this out after creating the account for security!
app.get('/api/create-owner', async (req, res) => {
  try {
    const User = require('./models/User');
    const existing = await User.findOne({ email: 'owner@test.com' });
    if (existing) {
      return res.json({ 
        message: 'Owner account already exists!',
        credentials: { email: 'owner@test.com', password: 'password123' },
        loginUrl: 'http://localhost:3000/owner/login'
      });
    }
    const owner = await User.create({
      name: 'Test Owner',
      email: 'owner@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'owner'
    });
    res.json({ 
      success: true,
      message: '✅ Test owner account created!',
      credentials: { email: 'owner@test.com', password: 'password123' },
      loginUrl: 'http://localhost:3000/owner/login'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// TEMPORARY ROUTE - Create test admin account
// Visit: http://localhost:5000/api/create-admin to create account
// Comment this out after creating the account for security!
app.get('/api/create-admin', async (req, res) => {
  try {
    const User = require('./models/User');
    const existing = await User.findOne({ email: 'admin@test.com' });
    if (existing) {
      return res.json({ 
        message: 'Admin account already exists!',
        credentials: { email: 'admin@test.com', password: 'admin123' },
        loginUrl: 'http://localhost:3000/admin/login'
      });
    }
    const admin = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      phone: '9999999999',
      role: 'admin'
    });
    res.json({ 
      success: true,
      message: '✅ Test admin account created!',
      credentials: { email: 'admin@test.com', password: 'admin123' },
      loginUrl: 'http://localhost:3000/admin/login'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
