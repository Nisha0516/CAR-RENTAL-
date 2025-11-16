# 🔧 Owner Login Troubleshooting Guide

## Issue Fixed ✅
Updated the Owner Login page to properly handle loading states and token storage.

---

## Common Issues & Solutions

### 1. Backend Server Not Running
**Symptom:** Network errors, "Failed to fetch"

**Solution:**
```bash
cd backend
npm run dev
```

Check console for: `Server running on port 5000`

---

### 2. Database Not Connected
**Symptom:** "MongoError" or connection errors

**Solution:**
```bash
# Check .env file exists in backend folder
cd backend
cat .env

# Should have:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

---

### 3. No Owner Account Exists
**Symptom:** "Invalid credentials" error

**Solution - Create Owner Account:**

**Option A: Via Signup Page**
1. Go to: http://localhost:3000/owner/signup
2. Fill form with:
   - Name: Your Name
   - Email: owner@test.com
   - Password: password123
   - Phone: 9876543210
   - Role: owner (auto-selected)
3. Click "Sign Up"

**Option B: Direct Database Insert**
```javascript
// Add to backend/server.js temporarily
app.post('/api/create-test-owner', async (req, res) => {
  const User = require('./models/User');
  try {
    const owner = await User.create({
      name: 'Test Owner',
      email: 'owner@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'owner'
    });
    res.json({ success: true, owner: { email: owner.email } });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Then visit: http://localhost:5000/api/create-test-owner
// Remove this route after creating account!
```

---

### 4. CORS Issues
**Symptom:** "CORS policy" errors in browser console

**Solution:**
Check `backend/server.js` has:
```javascript
const cors = require('cors');
app.use(cors());
```

---

### 5. Wrong Role Selected
**Symptom:** "Invalid credentials. Please use owner login."

**Solution:**
- Make sure you signed up with role: "owner"
- Check database: User collection → role field should be "owner"
- Don't use customer or admin credentials on owner login page

---

## Testing Steps

### Step 1: Verify Backend is Running
```bash
cd backend
npm run dev

# Should see:
# ✅ MongoDB Connected: ...
# ✅ Server running on port 5000
```

### Step 2: Verify Database Connection
```bash
# Check MongoDB is accessible
# If using MongoDB Atlas, check:
# - Network access allows your IP
# - Cluster is running
```

### Step 3: Create Test Owner (if needed)
```bash
# Use Owner Signup page or direct insert method above
```

### Step 4: Test Login
1. Go to: http://localhost:3000/owner/login
2. Enter credentials:
   - Email: owner@test.com
   - Password: password123
3. Click "Sign In"
4. Should redirect to: http://localhost:3000/owner/dashboard

---

## Debugging with Browser Console

### Check Network Tab
1. Open Browser DevTools (F12)
2. Go to "Network" tab
3. Try to login
4. Look for POST request to: `http://localhost:5000/api/auth/login`
5. Check response:

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test Owner",
    "email": "owner@test.com",
    "phone": "9876543210",
    "role": "owner"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Check Console Tab
Look for errors:
- `Owner login error: ...` - Shows the specific error
- Network errors - Backend not running
- CORS errors - CORS not configured

---

## Quick Test Script

Run this in browser console on login page:

```javascript
// Test login API directly
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'owner@test.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log('Login response:', data))
.catch(err => console.error('Login error:', err));
```

---

## What Should Happen (Correct Flow)

1. ✅ User enters email/password
2. ✅ Click "Sign In" → Button shows "Signing In..."
3. ✅ POST request to `/api/auth/login`
4. ✅ Backend validates credentials
5. ✅ Backend checks role === 'owner'
6. ✅ Backend returns token + user data
7. ✅ Frontend stores token in localStorage
8. ✅ Frontend redirects to `/owner/dashboard`
9. ✅ Owner Dashboard loads with owner's data

---

## Check LocalStorage

After successful login, run in console:

```javascript
// Should return JWT token
console.log('Token:', localStorage.getItem('token'));

// Should return user object with role: 'owner'
console.log('User:', JSON.parse(localStorage.getItem('user')));
```

---

## Still Not Working?

### Option 1: Check Logs
**Backend logs:**
```bash
cd backend
npm run dev
# Watch console for errors when you try to login
```

**Frontend logs:**
- Open browser console (F12)
- Try to login
- Look for error messages

### Option 2: Verify Everything is Updated
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Option 3: Test with Postman/Thunder Client

**POST** `http://localhost:5000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "owner@test.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "token": "...",
  "user": {
    "role": "owner",
    ...
  }
}
```

---

## Create Test Owner Account (Quick Method)

**Add this temporarily to `backend/server.js` after `app.use` lines:**

```javascript
// TEMPORARY - Remove after creating test account!
app.get('/create-owner', async (req, res) => {
  const User = require('./models/User');
  try {
    // Check if owner exists
    const existing = await User.findOne({ email: 'owner@test.com' });
    if (existing) {
      return res.json({ message: 'Owner already exists!', email: 'owner@test.com' });
    }
    
    // Create owner
    const owner = await User.create({
      name: 'Test Owner',
      email: 'owner@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'owner'
    });
    
    res.json({ 
      success: true, 
      message: 'Owner created!',
      credentials: {
        email: 'owner@test.com',
        password: 'password123'
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
```

**Then visit:** http://localhost:5000/create-owner

**IMPORTANT:** Remove this route after creating the account!

---

## Summary

✅ **Code is fixed** - Loading states and error handling updated  
✅ **Backend is correct** - Login endpoint working  
✅ **API is correct** - Authentication service configured  

**Most likely issues:**
1. Backend not running
2. No owner account exists
3. Database not connected
4. Wrong credentials

**Solution:**
1. Start backend server
2. Create owner account via signup or direct insert
3. Try login again

---

## Test Credentials (After Creation)

**Owner Login:**
- Email: owner@test.com
- Password: password123
- Page: http://localhost:3000/owner/login

**Should redirect to:**
- http://localhost:3000/owner/dashboard

---

Need more help? Check the error message in:
1. Browser console (F12 → Console tab)
2. Network tab (F12 → Network tab)
3. Backend terminal logs
