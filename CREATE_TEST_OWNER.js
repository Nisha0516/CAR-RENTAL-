// Quick script to create a test owner account
// Run this with: node CREATE_TEST_OWNER.js

require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const User = require('./backend/models/User');

const createTestOwner = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if owner exists
    const existing = await User.findOne({ email: 'owner@test.com' });
    if (existing) {
      console.log('ℹ️  Owner account already exists!');
      console.log('\n📧 Use these credentials to login:');
      console.log('   Email: owner@test.com');
      console.log('   Password: password123');
      console.log('   Login at: http://localhost:3000/owner/login\n');
      process.exit(0);
    }

    // Create test owner
    const owner = await User.create({
      name: 'Test Owner',
      email: 'owner@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'owner'
    });

    console.log('✅ Test owner account created successfully!\n');
    console.log('📧 Login Credentials:');
    console.log('   Email: owner@test.com');
    console.log('   Password: password123');
    console.log('\n🌐 Login at: http://localhost:3000/owner/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createTestOwner();
