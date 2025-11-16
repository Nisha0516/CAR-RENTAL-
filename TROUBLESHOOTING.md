# 🔧 Troubleshooting Guide

This guide helps you solve common issues when setting up and running the Car Rental System.

## 📋 Table of Contents
- [Setup Issues](#setup-issues)
- [Backend Issues](#backend-issues)
- [Frontend Issues](#frontend-issues)
- [Database Issues](#database-issues)
- [Authentication Issues](#authentication-issues)
- [API Connection Issues](#api-connection-issues)
- [Performance Issues](#performance-issues)

---

## Setup Issues

### `node` is not recognized
**Error:** `'node' is not recognized as an internal or external command`

**Solution:**
1. Install Node.js from https://nodejs.org/ (LTS version recommended)
2. Restart your terminal after installation
3. Verify: `node --version` and `npm --version`

---

### Permission denied when running scripts
**Error:** `cannot be loaded because running scripts is disabled`

**Solution (Windows PowerShell):**
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### `npm install` fails
**Error:** Various npm errors during installation

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

---

## Backend Issues

### Backend won't start

#### `nodemon: command not found`
**Solution:**
```bash
# Install nodemon locally
cd backend
npm install --save-dev nodemon

# Or use npx
npx nodemon server.js

# Or use node directly
npm start
```

---

#### `MongoDB Connection Error: uri is undefined`
**Error:** The `uri` parameter to `openUri()` must be a string, got "undefined"

**Solution:**
1. Check if `backend/.env` file exists
2. If not, create it from template:
   ```bash
   cd backend
   copy .env.example .env  # Windows
   cp .env.example .env    # Mac/Linux
   ```
3. Edit `.env` and add your MongoDB URI:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/car_rental
   ```
4. Restart the backend server

---

#### `MongoDB Connection Error: authentication failed`
**Cause:** Incorrect MongoDB credentials

**Solution:**
1. **Local MongoDB:**
   - Use: `mongodb://127.0.0.1:27017/car_rental`
   - Ensure MongoDB service is running:
     ```bash
     # Windows
     net start MongoDB
     
     # Mac/Linux
     sudo systemctl start mongod
     ```

2. **MongoDB Atlas:**
   - Double-check username and password
   - Ensure user has read/write permissions
   - URI format:
     ```
     mongodb+srv://username:password@cluster.mongodb.net/car_rental
     ```

---

#### `MongoDB Connection Error: connect ECONNREFUSED`
**Cause:** MongoDB is not running or wrong host/port

**Solution:**

**For Local MongoDB:**
```bash
# Windows - Check if MongoDB is running
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
mongo --eval "db.stats()"
```

**For MongoDB Atlas:**
- Check your internet connection
- Verify the cluster is not paused
- Check firewall/network restrictions

---

#### Port 5000 already in use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```powershell
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <process-id> /F

# Or change port in backend/.env
PORT=5001
```

---

#### `Cannot find module` errors
**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## Frontend Issues

### Port 3000 already in use
**Error:** `Something is already running on port 3000`

**Solution 1: Kill existing process**
```powershell
# Windows
netstat -ano | findstr :3000
taskkill /PID <process-id> /F
```

**Solution 2: Use different port**
```powershell
# Windows PowerShell
$env:PORT=3001; npm start

# Mac/Linux
PORT=3001 npm start
```

---

### `Cannot find module 'jspdf'`
**This is normal!** The PDF libraries are already installed.

**If you still see errors:**
```bash
cd frontend
npm install jspdf jspdf-autotable
npm start
```

---

### White screen / Blank page
**Causes:**
1. Backend not running
2. API connection failed
3. JavaScript errors

**Solution:**
1. Check browser console (F12) for errors
2. Ensure backend is running at http://localhost:5000
3. Check network tab for failed API calls
4. Clear browser cache and reload:
   ```
   Ctrl + Shift + Delete → Clear cache
   Ctrl + F5 to hard reload
   ```

---

### Images not loading
**This is normal for demo data.** Mock data uses placeholder image paths.

**To add real images:**
1. Upload images through the Owner Dashboard
2. Backend stores images using Multer
3. Ensure `uploads/` folder has proper permissions

---

### Infinite loading / API not responding
**Causes:**
1. Backend not running
2. CORS misconfiguration
3. Wrong API base URL

**Solutions:**
1. Verify backend is running: http://localhost:5000/api/health
2. Check backend `.env`:
   ```env
   FRONTEND_URL=http://localhost:3000
   ```
3. Check frontend API configuration in `src/services/api.js`:
   ```javascript
   baseURL: 'http://localhost:5000/api'
   ```

---

## Database Issues

### Empty database / No data
**Cause:** Fresh database with no initial data

**Solution:**
1. Create test accounts:
   - Admin: http://localhost:5000/api/create-admin
   - Owner: http://localhost:5000/api/create-owner

2. Or manually register users through the frontend

---

### MongoDB not connecting (Local)
**Solution:**

**Windows:**
```bash
# Install MongoDB Community Server
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB service
net start MongoDB

# Check if running
mongo
```

**Mac:**
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start service
brew services start mongodb-community

# Check if running
mongo
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongo --eval "db.stats()"
```

---

### MongoDB Atlas connection issues

#### Network access
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Add current IP or allow all: `0.0.0.0/0` (dev only!)

#### Database access
1. Go to Database Access
2. Add new database user
3. Set username and password
4. Grant "Read and write to any database" role

#### Connection string
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/car_rental?retryWrites=true&w=majority
```
- Replace `<username>` and `<password>`
- Ensure no `<` `>` brackets in actual string
- Password must be URL-encoded if it contains special characters

---

## Authentication Issues

### Cannot login / Invalid credentials
**Solutions:**
1. Check if user exists in database
2. Verify email and password are correct
3. Check backend logs for authentication errors
4. Try creating a new test account

---

### Token expired errors
**Cause:** JWT token has expired

**Solution:**
1. Logout and login again
2. Or increase token expiry in backend:
   ```javascript
   // In authController.js
   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
   ```

---

### Logged out automatically
**Cause:** Invalid or expired token

**Solutions:**
1. Check if JWT_SECRET in backend `.env` hasn't changed
2. Clear localStorage and login again:
   ```javascript
   // In browser console
   localStorage.clear()
   ```

---

## API Connection Issues

### CORS errors
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. Check backend `.env`:
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

2. Restart backend server after changing `.env`

3. Check CORS configuration in `server.js`:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true
   }));
   ```

---

### API returns 404
**Causes:**
1. Backend not running
2. Wrong API endpoint
3. Route not defined

**Solutions:**
1. Check backend is running: http://localhost:5000/api/health
2. Verify API endpoint spelling
3. Check backend logs for route errors

---

### Network Error
**Error:** `Network Error` in console

**Solutions:**
1. Ensure backend is running
2. Check firewall isn't blocking connections
3. Verify API base URL in `src/services/api.js`
4. Check backend server logs

---

## Performance Issues

### Slow API responses
**Solutions:**
1. Check MongoDB connection speed
2. Add database indexes for frequently queried fields
3. Enable response caching
4. Check server resources (CPU, RAM)

---

### Frontend slow/laggy
**Solutions:**
1. Clear browser cache
2. Check browser console for memory leaks
3. Close unnecessary browser tabs
4. Update browser to latest version

---

## Quick Diagnosis Checklist

When something doesn't work, check these in order:

### ✅ Backend Health Check
```bash
# Terminal should show:
✅ MongoDB Connected: <host>
🚀 Server running on port 5000
```

Visit: http://localhost:5000/api/health
Should return:
```json
{
  "success": true,
  "message": "Car Rental API is running!",
  "timestamp": "..."
}
```

---

### ✅ Frontend Health Check
```bash
# Terminal should show:
Compiled successfully!
webpack compiled with X warnings
```

Visit: http://localhost:3000
Should load landing page with three role cards

---

### ✅ MongoDB Health Check
**Local:**
```bash
mongo
> show dbs
> use car_rental
> show collections
```

**Atlas:**
- Login to MongoDB Atlas
- Go to Database → Collections
- Should see: users, cars, bookings, etc.

---

### ✅ Environment Variables Check
```bash
# Backend .env should have:
MONGODB_URI=<your-connection-string>
JWT_SECRET=<your-secret>
PORT=5000
FRONTEND_URL=http://localhost:3000
```

---

## Still Having Issues?

### Debug Steps
1. **Check Logs:**
   - Backend terminal for API errors
   - Browser console (F12) for frontend errors
   - MongoDB logs for database issues

2. **Test API Directly:**
   ```bash
   # Use curl or Postman
   curl http://localhost:5000/api/health
   ```

3. **Verify Environment:**
   ```bash
   node --version  # Should be v16+
   npm --version
   mongo --version  # For local MongoDB
   ```

4. **Clean Install:**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Common Error Messages Quick Reference

| Error | File | Solution |
|-------|------|----------|
| `uri is undefined` | backend/.env | Add MONGODB_URI |
| `nodemon not found` | backend/ | npm install nodemon |
| `Port 5000 in use` | backend/.env | Change PORT or kill process |
| `CORS policy` | server.js | Check FRONTEND_URL in .env |
| `Cannot find module` | any | npm install |
| `Port 3000 in use` | frontend/ | Kill process or use PORT=3001 |
| `Network Error` | API | Check backend is running |
| `Token expired` | Auth | Logout and login again |
| `MongoDB not running` | Database | Start MongoDB service |

---

## Need More Help?

1. Check project documentation files (*.md)
2. Review backend logs for detailed error messages
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Try clean install of dependencies

---

**Remember:** Most issues are solved by:
1. Ensuring backend is running
2. Correct `.env` configuration
3. MongoDB is accessible
4. Clearing cache and reinstalling dependencies
