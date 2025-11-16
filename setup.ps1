# Car Rental System - Automated Setup Script (PowerShell)
# Run this script to set up both frontend and backend

Write-Host "🚗 Car Rental System - Automated Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm is installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Setup Backend
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow
Write-Host "------------------------" -ForegroundColor Yellow

if (Test-Path "backend") {
    Set-Location backend
    
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    # Check if .env exists
    if (-not (Test-Path ".env")) {
        if (Test-Path ".env.example") {
            Write-Host ""
            Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
            Write-Host "   Copying .env.example to .env..." -ForegroundColor Yellow
            Copy-Item ".env.example" ".env"
            Write-Host "✅ Created .env file" -ForegroundColor Green
            Write-Host ""
            Write-Host "⚠️  IMPORTANT: Edit backend/.env and configure:" -ForegroundColor Yellow
            Write-Host "   1. MONGODB_URI (your MongoDB connection string)" -ForegroundColor Yellow
            Write-Host "   2. JWT_SECRET (change to a random secret key)" -ForegroundColor Yellow
            Write-Host ""
        }
    } else {
        Write-Host "✅ .env file already exists" -ForegroundColor Green
    }
    
    Set-Location ..
} else {
    Write-Host "❌ Backend folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Setup Frontend
Write-Host "📦 Setting up Frontend..." -ForegroundColor Yellow
Write-Host "-------------------------" -ForegroundColor Yellow

if (Test-Path "frontend") {
    Set-Location frontend
    
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    Set-Location ..
} else {
    Write-Host "❌ Frontend folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Configure MongoDB:" -ForegroundColor White
Write-Host "   - Edit backend/.env" -ForegroundColor Gray
Write-Host "   - Set MONGODB_URI to your MongoDB connection string" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start Backend Server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. In a NEW terminal, Start Frontend:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Access the application:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:5000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Create test accounts:" -ForegroundColor White
Write-Host "   Admin:  http://localhost:5000/api/create-admin" -ForegroundColor Cyan
Write-Host "   Owner:  http://localhost:5000/api/create-owner" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 For more info, check README.md" -ForegroundColor Yellow
Write-Host ""
