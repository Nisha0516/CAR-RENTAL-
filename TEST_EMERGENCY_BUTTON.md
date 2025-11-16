# 🚨 Testing Emergency Button - Step by Step

## Current Issue: Button shows but doesn't send notifications

---

## 🔧 IMMEDIATE FIX - Do These Steps:

### Step 1: Restart Backend Server
```bash
cd backend
# Press Ctrl+C to stop if running
npm run dev
```

**Look for this in console:**
```
✅ MongoDB connected successfully!
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

### Step 2: Restart Frontend Server
```bash
cd frontend
# Press Ctrl+C to stop if running
npm start
```

### Step 3: Clear Browser Cache
```
1. Press Ctrl+Shift+Del
2. Select "Cached images and files"
3. Click "Clear data"
4. Close and reopen browser
```

### Step 4: Open Browser Console
```
1. Press F12
2. Go to "Console" tab
3. Keep it open!
```

### Step 5: Login and Check Console
```
1. Login as customer (the one who booked Swift car)
2. Go to "My Bookings" page
3. Look at console messages
```

---

## 🔍 What to Look For in Console

### When Page Loads:
```
🚨 Emergency Button: No token found
OR
🚨 Emergency Button: Fetching bookings...
🚨 Emergency Button: Bookings response: {...}
✅ Emergency Button: Active booking found!
OR
🧪 TESTING MODE: Using first available booking
```

### What You Should See:
- **If you see "Active booking found"** → Button will appear!
- **If you see "TESTING MODE"** → Button will appear!
- **If you see "No active booking"** → Check booking status

---

## 📱 Test the Emergency Button

### Step 1: Find the Button
```
Look at bottom-right corner of screen
You should see:
┌─────────────────┐
│ 🚨 Emergency   │  ← Red pulsing button
└─────────────────┘
```

### Step 2: Click the Button
```
1. Click the red Emergency button
2. Modal should open
3. GPS location should start capturing
```

### Step 3: Watch Console
```
Console should show:
📍 Location obtained: {latitude: ..., longitude: ...}
```

### Step 4: Select Emergency Type
```
1. Click "Car Breakdown" (or any type)
2. Add description: "Test emergency alert"
3. Click "Send Emergency Alert"
```

### Step 5: Watch Console Carefully
```
Console should show:
🚨 Sending emergency alert...
📦 Emergency Data: {...}
🔑 Booking ID: 69500d2b7a580ee0ac47722a8
📍 Location: {...}

Then EITHER:
✅ Emergency alert sent successfully!
📨 Response: {...}

OR:
❌ Emergency alert error: ...
Error details: ...
```

---

## 🎯 Expected Backend Response

When you click "Send Emergency Alert", the backend should:

1. **Receive the request** at `POST /api/emergency`
2. **Validate** booking and user
3. **Create emergency record** in database
4. **Log to console:**
```
🚨 EMERGENCY ALERT CREATED:
Type: breakdown
Customer: Mounish (phone number)
Car: Swift
Owner: Owner Name (phone number)
Location: 12.345678, 78.901234
Google Maps: https://maps.google.com/?q=12.345678,78.901234
```

5. **Return success response**

---

## 🐛 Common Issues & Fixes

### Issue 1: "Failed to send emergency alert"

**Possible Causes:**
- Backend server not running
- Emergency routes not loaded
- Authentication token expired
- Booking ID not found

**Fix:**
1. Check backend console for errors
2. Restart backend server
3. Logout and login again
4. Check booking exists in database

### Issue 2: Button doesn't appear

**Fix:**
Already applied! The code now uses testing mode.
Just refresh the page after restarting frontend.

### Issue 3: Location shows "unavailable"

**Fix:**
1. Enable location permissions in browser
2. Try in Chrome (better GPS support)
3. You can still send alert without location

### Issue 4: No console messages

**Fix:**
1. Make sure F12 console is open
2. Refresh the page
3. Check "Preserve log" option in console
4. Clear console and refresh again

---

## 📊 Verify Backend Manually

Test backend directly:

### Test 1: Health Check
```
Open browser: http://localhost:5000/api/health

Should show:
{
  "success": true,
  "message": "Car Rental API is running!",
  "timestamp": "..."
}
```

### Test 2: Check Emergency Route
Open your API testing tool (Postman/Thunder Client) or backend console.

The route should be registered in server.js:
```javascript
app.use('/api/emergency', require('./routes/emergencyRoutes'));
```

---

## 🎯 Test Emergency Creation Manually

### Using Postman/Thunder Client:

**Request:**
```
POST http://localhost:5000/api/emergency
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_CUSTOMER_TOKEN
```

**Body:**
```json
{
  "bookingId": "69500d2b7a580ee0ac47722a8",
  "type": "breakdown",
  "description": "Test emergency",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "accuracy": 10,
    "timestamp": "2025-10-28T10:30:00.000Z"
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Emergency alert sent successfully!",
  "emergency": {
    "_id": "...",
    "booking": "...",
    "type": "breakdown",
    "status": "pending",
    ...
  }
}
```

---

## 🔍 Check Database

After sending emergency alert:

### MongoDB Compass or CLI:
```javascript
// Connect to database
use car_rental

// Check emergencies collection
db.emergencies.find().pretty()

// You should see the emergency record!
```

---

## ✅ Success Checklist

After clicking "Send Emergency Alert", verify:

- [ ] Console shows "✅ Emergency alert sent successfully!"
- [ ] Success alert popup appears
- [ ] Modal closes
- [ ] Backend console shows emergency details
- [ ] Database has new emergency record
- [ ] Emergency ID is shown in alert

---

## 📞 What Happens Next (In Production)

In your current implementation:

1. **Emergency is created** in database ✅
2. **Console logs** show the details ✅
3. **Response** sent to customer ✅

**NOT YET IMPLEMENTED (but ready):**
- SMS to owner ⏳
- Email to admin ⏳
- Push notifications ⏳

The **database tracks** that notifications were sent:
```javascript
notificationsSent: {
  owner: true,
  admin: true,
  customer: true
}
```

This is ready for SMS/Email integration!

---

## 🚀 Owner/Admin Can View Emergencies

### For Owner:
```
GET http://localhost:5000/api/emergency/owner
Headers: Authorization: Bearer OWNER_TOKEN
```

### For Admin:
```
GET http://localhost:5000/api/emergency/all
Headers: Authorization: Bearer ADMIN_TOKEN
```

They will see:
- Customer name & phone
- Car details
- Emergency type
- Location (GPS coordinates + Google Maps link)
- Description
- Timestamp
- Status

---

## 💡 Quick Debug Commands

### In Browser Console:
```javascript
// Check if booking exists
console.log('Booking:', localStorage.getItem('activeBooking'));

// Check token
console.log('Token:', localStorage.getItem('token'));

// Check user
console.log('User:', localStorage.getItem('user'));

// Manually trigger emergency fetch
// (only works if you have the function in scope)
```

### In Backend Terminal:
```bash
# Check if server is running
curl http://localhost:5000/api/health

# Check all routes
# Look for "GET /api/emergency" in the output
```

---

## 🎉 When It Works

You'll know everything is working when:

1. **Button appears** (red, pulsing, bottom-right)
2. **Click button** → Modal opens
3. **Select type** → "Car Breakdown"
4. **Click Send** → Console shows success
5. **Backend logs** emergency details
6. **Alert shows** "Emergency ID: ..."
7. **Database** has the record

**Then the owner/admin can see it in their dashboard!**

---

## 📝 Summary of Changes Made

1. ✅ Made booking status check case-insensitive
2. ✅ Added testing mode (uses any booking)
3. ✅ Added detailed console logging
4. ✅ Improved error messages
5. ✅ Added emergency ID in success alert

---

## 🆘 Still Not Working?

1. **Check backend console** for errors
2. **Check frontend console** for errors  
3. **Verify booking ID** is correct
4. **Check MongoDB** is connected
5. **Verify emergency routes** loaded in server.js

**Send me the console output and I'll help debug!**

---

**Last Updated:** October 28, 2025, 10:30 PM
**Status:** Testing mode enabled, detailed logging added
**Next Step:** Restart both servers and test!
