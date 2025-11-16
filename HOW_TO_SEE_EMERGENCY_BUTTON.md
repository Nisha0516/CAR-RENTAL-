# 🚨 How to See the Emergency Button

## ⚠️ Important: The button ONLY appears when you have an active booking!

---

## 📋 Quick Steps to See the Emergency Button

### Step 1: Restart Your Servers

**Backend:**
```bash
cd backend
# Stop server (Ctrl+C if running)
npm run dev
```

**Frontend (New Terminal):**
```bash
cd frontend
# Stop server (Ctrl+C if running)
npm start
```

### Step 2: Login as Customer
```
URL: http://localhost:3000/customer/login
Email: (your customer email)
Password: (your password)
```

### Step 3: Check Browser Console (IMPORTANT!)
```
1. Press F12 to open Developer Tools
2. Go to "Console" tab
3. Look for messages starting with "🚨 Emergency Button:"
4. This will tell you if:
   - Token is found
   - Bookings are being fetched
   - Active booking exists
```

### Step 4: Create or Use Existing Booking

**Option A: If you have NO bookings yet**
```
1. Go to http://localhost:3000/customer/home
2. Browse and select a car
3. Click "Book Now"
4. Fill in booking details
5. Submit booking request
```

**Option B: If you have bookings but they're rejected**
```
You need to either:
- Login as Owner and approve a booking
- Login as Admin and change booking status to "confirmed"
```

### Step 5: Check Console Again
```
After booking, check console:
✅ "Emergency Button: Active booking found!" 
   → Button should appear!

⚠️ "Emergency Button: No active booking"
   → You'll see a debug message in bottom-right
```

---

## 🔍 Debugging: What You Should See

### If Button Shows (Success!):
```
Bottom-Right Corner:
┌─────────────────────┐
│  🚨 Emergency      │
└─────────────────────┘
Red pulsing button
```

### If Button Doesn't Show:
```
Bottom-Right Corner:
┌─────────────────────────────┐
│ ℹ️ Emergency Button Hidden  │
│ Book a car to see the       │
│ Emergency button!           │
│ Check console (F12) for     │
│ details.                     │
└─────────────────────────────┘
Pink info box
```

---

## 🎯 Console Messages Explained

### Message 1: Token Check
```
🚨 Emergency Button: No token found
→ You're not logged in!
→ Solution: Login as customer
```

### Message 2: Fetching Bookings
```
🚨 Emergency Button: Fetching bookings...
→ System is checking for your bookings
→ Wait for next message...
```

### Message 3: Bookings Response
```
🚨 Emergency Button: Bookings response: {success: true, bookings: Array(2)}
→ System found your bookings
→ Check the array to see booking statuses
```

### Message 4A: Active Booking Found (SUCCESS!)
```
✅ Emergency Button: Active booking found!
{_id: "...", status: "confirmed", car: {...}, ...}
→ Button will appear!
```

### Message 4B: No Active Booking
```
⚠️ Emergency Button: No active booking (status must be confirmed/pending)
Available bookings: [{status: "rejected"}, {status: "completed"}]
→ Button won't appear
→ Need booking with status "confirmed" or "pending"
```

### Message 5: Testing Mode (Temporary)
```
🧪 TESTING MODE: Using first available booking
→ I added this for testing
→ Button will show even if booking isn't confirmed
```

---

## 🛠️ Manual Testing Method

If you want to see the button RIGHT NOW for testing:

### Edit CustomerLayout.js:
```javascript
// Find line ~264:
{activeBooking && <EmergencyButton booking={activeBooking} />}

// Change to (TEMPORARY):
{(activeBooking || isLoggedIn) && <EmergencyButton booking={activeBooking || { _id: 'test', car: {name: 'Test Car'} }} />}
```

**This will show the button whenever you're logged in!**

⚠️ **Remember to change it back after testing!**

---

## 📊 Booking Status Requirements

The button appears for these booking statuses:
- ✅ **"confirmed"** - Owner approved the booking
- ✅ **"pending"** - Waiting for owner approval (testing mode)

The button DOES NOT appear for:
- ❌ **"rejected"** - Owner rejected
- ❌ **"completed"** - Trip finished
- ❌ **"cancelled"** - Booking cancelled

---

## 🔧 Quick Fix: Make Button Always Show

If you want to test the button immediately:

**Edit:** `frontend/src/pages/customer/CustomerLayout.js`

**Find this code (around line 57-104):**
```javascript
// Fetch active booking for emergency button
useEffect(() => {
  const fetchActiveBooking = async () => {
    // ... existing code ...
  };
  // ...
}, []);
```

**Add this AFTER the useEffect:**
```javascript
// TEMPORARY: Force show button for testing
useEffect(() => {
  if (isLoggedIn && !activeBooking) {
    setActiveBooking({
      _id: 'test-booking',
      car: { name: 'Test Car', _id: 'test-car' },
      status: 'confirmed'
    });
  }
}, [isLoggedIn]);
```

**This forces the button to appear whenever you're logged in!**

---

## ✅ Step-by-Step Checklist

- [ ] Backend server running (`npm run dev` in backend folder)
- [ ] Frontend server running (`npm start` in frontend folder)
- [ ] Logged in as customer
- [ ] Browser console open (F12 → Console tab)
- [ ] Console shows "🚨 Emergency Button: Fetching bookings..."
- [ ] You have at least one booking in the system
- [ ] Booking status is "confirmed" or "pending"
- [ ] Console shows "✅ Emergency Button: Active booking found!"
- [ ] Red button visible in bottom-right corner

---

## 🎯 Still Not Working?

### Check These Common Issues:

1. **No Bookings Yet**
   - Create a new booking
   - Or use the "force show" method above

2. **All Bookings Rejected**
   - Login as owner and approve one
   - Or change status in database

3. **Import Error**
   - Check console for red error messages
   - Make sure all files exist in `frontend/src/components/EmergencyButton/`

4. **CSS Not Loading**
   - Clear browser cache (Ctrl+Shift+Del)
   - Hard refresh (Ctrl+F5)

5. **Token Issues**
   - Logout and login again
   - Check localStorage in DevTools (Application tab)

---

## 💡 Expected Behavior

### When Button Shows:
- **Position:** Fixed bottom-right corner
- **Color:** Red with white text
- **Animation:** Pulsing effect
- **Icon:** 🚨 Emergency
- **Hover:** Scales up slightly

### When You Click:
- Modal opens immediately
- GPS location starts capturing
- 8 emergency types displayed
- Description field available
- Location shown on map link

---

## 📞 Need More Help?

Check these files for errors:
```
frontend/src/components/EmergencyButton/EmergencyButton.js
frontend/src/components/EmergencyButton/EmergencyModal.js
frontend/src/components/EmergencyButton/EmergencyButton.css
frontend/src/pages/customer/CustomerLayout.js
```

Look in browser console (F12) for:
- ❌ Red error messages
- ⚠️ Yellow warning messages
- 🚨 Blue info messages (my debug logs)

---

## 🎉 Success Indicator

You'll know it's working when you see:

**In Console:**
```
✅ Emergency Button: Active booking found!
{
  _id: "67...",
  status: "confirmed",
  car: { name: "Swift", ... },
  ...
}
```

**On Screen:**
```
A red, pulsing button in the bottom-right corner
that says "🚨 Emergency"
```

**When Clicked:**
```
A beautiful modal opens with:
- Emergency types
- GPS location
- Description field
- Send Alert button
```

---

## 🚀 Final Steps

1. **Restart both servers** (backend & frontend)
2. **Open browser console** (F12)
3. **Login as customer**
4. **Check console messages**
5. **Look for button or debug message in bottom-right**

**The button WILL appear if you have an active booking!**

---

**Last Updated:** October 28, 2025
**Status:** Debug mode enabled + Testing mode active
