# Car Rental System - Development Server Launcher
# This script starts both backend and frontend servers in separate windows

Write-Host "🚗 Starting Car Rental Development Servers..." -ForegroundColor Cyan
Write-Host ""

# Check if backend folder exists
if (-not (Test-Path "backend")) {
    Write-Host "❌ Backend folder not found!" -ForegroundColor Red
    Write-Host "   Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Check if frontend folder exists
if (-not (Test-Path "frontend")) {
    Write-Host "❌ Frontend folder not found!" -ForegroundColor Red
    Write-Host "   Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Check if backend .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  Warning: backend/.env not found!" -ForegroundColor Yellow
    Write-Host "   The backend may fail to start without MongoDB configuration" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        Write-Host "Setup cancelled. Please create backend/.env first." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
$backendPath = (Get-Location).Path + "\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host '🔧 Backend Server' -ForegroundColor Cyan; npm run dev"

Start-Sleep -Seconds 2

Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Green
$frontendPath = (Get-Location).Path + "\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '🎨 Frontend Server' -ForegroundColor Magenta; npm start"

Write-Host ""
Write-Host "✅ Development servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "📡 Services:" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:5000/api" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: Wait for both servers to fully start before accessing the app" -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop the servers, close the terminal windows or press Ctrl+C in each" -ForegroundColor Gray
Write-Host ""
