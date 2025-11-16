# Create .env file for backend
# This script automatically creates the backend/.env file with default configuration

Write-Host "🔧 Creating backend/.env file..." -ForegroundColor Cyan
Write-Host ""

# Check if backend folder exists
if (-not (Test-Path "backend")) {
    Write-Host "❌ Error: backend folder not found!" -ForegroundColor Red
    Write-Host "   Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Check if .env already exists
if (Test-Path "backend\.env") {
    Write-Host "⚠️  Warning: backend/.env already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Cancelled. Existing .env file kept." -ForegroundColor Yellow
        exit 0
    }
}

# Generate random JWT secret
Write-Host "🔐 Generating secure JWT secret..." -ForegroundColor Cyan
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Write to file directly
try {
    $envPath = "backend\.env"
    
    # Create the content as an array
    $content = @()
    $content += "# ========================================"
    $content += "# MongoDB Connection"
    $content += "# ========================================"
    $content += "# Choose ONE option below:"
    $content += ""
    $content += "# OPTION 1: Local MongoDB (if installed on your computer)"
    $content += "MONGODB_URI=mongodb://127.0.0.1:27017/car_rental"
    $content += ""
    $content += "# OPTION 2: MongoDB Atlas (cloud - free tier)"
    $content += "# Uncomment and update with your Atlas connection string:"
    $content += "# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car_rental?retryWrites=true&w=majority"
    $content += ""
    $content += ""
    $content += "# ========================================"
    $content += "# JWT Secret Key (Auto-generated)"
    $content += "# ========================================"
    $content += "JWT_SECRET=$jwtSecret"
    $content += ""
    $content += ""
    $content += "# ========================================"
    $content += "# Server Configuration"
    $content += "# ========================================"
    $content += "PORT=5000"
    $content += "FRONTEND_URL=http://localhost:3000"
    $content += ""
    $content += ""
    $content += "# ========================================"
    $content += "# Optional Settings"
    $content += "# ========================================"
    $content += "SESSION_SECRET=session_secret_key_change_in_production"
    $content += "MAX_FILE_SIZE=10485760"
    
    # Write to file
    $content | Out-File -FilePath $envPath -Encoding UTF8
    
    Write-Host "✅ Successfully created backend/.env file!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Configuration:" -ForegroundColor Yellow
    Write-Host "   - MongoDB URI: mongodb://127.0.0.1:27017/car_rental (Local)" -ForegroundColor Gray
    Write-Host "   - JWT Secret: Auto-generated (64 characters)" -ForegroundColor Gray
    Write-Host "   - Port: 5000" -ForegroundColor Gray
    Write-Host "   - Frontend URL: http://localhost:3000" -ForegroundColor Gray
    Write-Host ""
    
    # Check if MongoDB is needed
    Write-Host "📋 Next Steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. If using LOCAL MongoDB:" -ForegroundColor White
    Write-Host "   - Ensure MongoDB is installed and running" -ForegroundColor Gray
    Write-Host "   - Windows: net start MongoDB" -ForegroundColor Gray
    Write-Host "   - The .env file is already configured" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. If using MongoDB ATLAS (cloud):" -ForegroundColor White
    Write-Host "   - Edit backend/.env" -ForegroundColor Gray
    Write-Host "   - Comment out the local MONGODB_URI line" -ForegroundColor Gray
    Write-Host "   - Uncomment and update the Atlas MONGODB_URI line" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Start the backend server:" -ForegroundColor White
    Write-Host "   cd backend" -ForegroundColor Gray
    Write-Host "   npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. Watch for this message:" -ForegroundColor White
    Write-Host "   ✅ MongoDB Connected: [host]" -ForegroundColor Green
    Write-Host ""
    
    # Ask if user wants to check MongoDB status
    Write-Host "Would you like to check if MongoDB is running? (y/n): " -ForegroundColor Cyan -NoNewline
    $check = Read-Host
    
    if ($check -eq "y") {
        Write-Host ""
        Write-Host "🔍 Checking MongoDB status..." -ForegroundColor Cyan
        
        # Try to check if MongoDB service is running
        $mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
        
        if ($mongoService) {
            if ($mongoService.Status -eq "Running") {
                Write-Host "✅ MongoDB service is running!" -ForegroundColor Green
                Write-Host "   You can start the backend server now" -ForegroundColor Gray
            } else {
                Write-Host "⚠️  MongoDB service exists but is not running" -ForegroundColor Yellow
                Write-Host "   Start it with: net start MongoDB" -ForegroundColor Gray
            }
        } else {
            Write-Host "⚠️  MongoDB service not found" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Options:" -ForegroundColor White
            Write-Host "1. Install MongoDB locally from: https://www.mongodb.com/try/download/community" -ForegroundColor Gray
            Write-Host "2. Use MongoDB Atlas (cloud) - Edit backend/.env with Atlas connection string" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Setup complete! Ready to start development!" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ Error creating .env file: $_" -ForegroundColor Red
    exit 1
}
"@
