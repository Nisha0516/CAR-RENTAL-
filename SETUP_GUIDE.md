# 🚀 Car Rental System - Setup Guide

## Quick Navigation
- [⚡ Super Quick Start](#-super-quick-start) (Automated)
- [📝 Manual Setup](#-manual-setup) (Step by Step)
- [🔧 First Time Setup](#-first-time-setup)
- [▶️ Daily Development](#-daily-development)
- [📌 Cheat Sheet](#-cheat-sheet)

---

## ⚡ Super Quick Start

**For Windows users - Automated installation:**

```powershell
# 1. Run setup script (installs everything)
.\setup.ps1

# 2. Edit backend/.env with your MongoDB URI
# See: MongoDB Setup section below

# 3. Start both servers
.\start-dev.ps1
```

That's it! Skip to [Create Test Accounts](#create-test-accounts)

---

## 📝 Manual Setup

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** (local or [Atlas account](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

---

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd CAR-RENTAL--master
```

---

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux

# Edit .env - IMPORTANT!
# Open backend/.env in your editor and configure:
```

**Edit `backend/.env`:**
```env
# Choose ONE MongoDB option:

# Option 1: Local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/car_rental

# Option 2: MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car_rental

JWT_SECRET=change_this_to_random_string
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Generate secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy the output and paste into .env
```

---

### Step 3: MongoDB Setup

#### Option A: Local MongoDB

**Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start service:
   ```bash
   net start MongoDB
   ```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb-org
sudo systemctl start mongod
```

Use connection string:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/car_rental
```

---

#### Option B: MongoDB Atlas (Cloud - FREE)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. **Database Access** → Add user (save username & password!)
5. **Network Access** → Allow access from anywhere (0.0.0.0/0)
6. **Database** → Connect → "Connect your application"
7. Copy connection string
8. Replace `<username>`, `<password>`, and `<dbname>` with:
   - username: your username
   - password: your password
   - dbname: `car_rental`

Example:
```env
MONGODB_URI=mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/car_rental?retryWrites=true&w=majority
```

---

### Step 4: Frontend Setup

```bash
# Open NEW terminal
cd frontend

# Install dependencies
npm install
```

---

### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev

# Expected output:
# 🚀 Server running on port 5000
# ✅ MongoDB Connected: [your-host]
# 📊 Database: car_rental
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start

# Expected output:
# Compiled successfully!
# Opens: http://localhost:3000
```

---

## 🔧 First Time Setup

### Create Test Accounts

After both servers are running, visit these URLs in your browser:

**1. Create Admin Account:**
- URL: http://localhost:5000/api/create-admin
- **Credentials:** 
  - Email: `admin@test.com`
  - Password: `admin123`
- **Login at:** http://localhost:3000/admin/login

**2. Create Owner Account:**
- URL: http://localhost:5000/api/create-owner
- **Credentials:** 
  - Email: `owner@test.com`
  - Password: `password123`
- **Login at:** http://localhost:3000/owner/login

**3. Create Customer Account:**
- **Signup at:** http://localhost:3000/signup
- Use any email/password

---

### Verify Setup

**Backend Health Check:**
- Visit: http://localhost:5000/api/health
- Should return: `{ "success": true, "message": "Car Rental API is running!" }`

**Frontend:**
- Visit: http://localhost:3000
- Should see landing page with three role cards

---

## ▶️ Daily Development

**Quick start after initial setup:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Or use the script (Windows):**
```powershell
.\start-dev.ps1
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

## 📌 Cheat Sheet

### Common Commands

```bash
# BACKEND COMMANDS
cd backend
npm install              # Install dependencies
npm run dev             # Start dev server (with nodemon)
npm start               # Start prod server
npm run dev             # Development with auto-reload

# FRONTEND COMMANDS
cd frontend
npm install              # Install dependencies
npm start               # Start dev server
npm run build           # Build for production
npm test                # Run tests

# MONGODB COMMANDS (Local)
net start MongoDB       # Start MongoDB (Windows)
net stop MongoDB        # Stop MongoDB (Windows)
mongo                   # Open MongoDB shell
```

---

### File Locations

```
Backend Configuration:   backend/.env
Frontend Config:         frontend/src/services/api.js
MongoDB Models:          backend/models/
API Routes:              backend/routes/
Controllers:             backend/controllers/
```

---

### Default Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| MongoDB (Local) | 27017 | mongodb://127.0.0.1:27017 |

---

### Environment Variables (.env)

| Variable | Required | Example |
|----------|----------|---------|
| `MONGODB_URI` | ✅ Yes | `mongodb://127.0.0.1:27017/car_rental` |
| `JWT_SECRET` | ✅ Yes | `random_secret_key_here` |
| `PORT` | Optional | `5000` |
| `FRONTEND_URL` | Optional | `http://localhost:3000` |

---

### Test Accounts

| Role | Email | Password | Login URL |
|------|-------|----------|-----------|
| Admin | admin@test.com | admin123 | /admin/login |
| Owner | owner@test.com | password123 | /owner/login |
| Customer | (signup) | (signup) | /login |

---

### Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `nodemon not found` | `npm install` in backend |
| `MongoDB connection error` | Check `.env` MONGODB_URI |
| `Port already in use` | Kill process or change port |
| `CORS error` | Check FRONTEND_URL in `.env` |
| `Cannot find module` | Run `npm install` |
| Backend crashes | Check MongoDB is running |

**Full troubleshooting:** See `TROUBLESHOOTING.md`

---

## 📚 Documentation Files

- **README.md** - Main project documentation
- **SETUP_GUIDE.md** - This file
- **TROUBLESHOOTING.md** - Problem solutions
- **QUICK_START.md** - UI testing guide
- **backend/README.md** - Backend API docs
- **FRONTEND_BACKEND_CONNECTION.md** - API integration

---

## 🎯 Next Steps

After successful setup:

1. ✅ Explore the landing page (http://localhost:3000)
2. ✅ Login as admin and explore dashboard
3. ✅ Login as owner and add a car
4. ✅ Login as customer and make a booking
5. ✅ Check the documentation files for features
6. ✅ Read `QUICK_START.md` for UI testing guide

---

## 🆘 Need Help?

1. **Check the logs:**
   - Backend terminal for API errors
   - Browser console (F12) for frontend errors

2. **Verify configuration:**
   ```bash
   # Check if .env exists
   ls backend/.env
   
   # Check MongoDB is running
   mongo --eval "db.stats()"
   ```

3. **Clean install:**
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

4. **Read documentation:**
   - TROUBLESHOOTING.md for common issues
   - README.md for complete guide
   - Backend README for API details

---

## ✅ Setup Complete!

Your development environment is ready! 🎉

**Start developing:**
```bash
# Start both servers and begin coding
npm run dev
```

Happy coding! 🚗💨
