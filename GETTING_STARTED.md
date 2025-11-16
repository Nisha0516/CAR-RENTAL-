# Getting Started - 5 Minutes ⚡

## What You Need
- Node.js installed
- MongoDB (local or Atlas account)

---

## 3-Step Setup

### 1️⃣ Install Everything
```bash
# Backend
cd backend
npm install
copy .env.example .env

# Frontend
cd frontend
npm install
```

### 2️⃣ Configure MongoDB
Edit `backend/.env`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/car_rental
JWT_SECRET=your_random_secret_here
```

### 3️⃣ Start Servers
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2  
cd frontend
npm start
```

---

## Create Test Accounts

Visit in browser:
- **Admin:** http://localhost:5000/api/create-admin
- **Owner:** http://localhost:5000/api/create-owner

---

## Access the App

**Frontend:** http://localhost:3000
**Backend:** http://localhost:5000/api/health

---

## Need MongoDB?

**Local:** Download from https://www.mongodb.com/try/download/community

**Or use Atlas (free cloud):** https://www.mongodb.com/cloud/atlas

---

## Having Issues?

See **SETUP_GUIDE.md** or **TROUBLESHOOTING.md**

---

That's it! You're ready to go! 🚀
