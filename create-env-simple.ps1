# Simple script to create backend/.env file
Write-Host "Creating backend/.env file..." -ForegroundColor Cyan

# Check if backend folder exists
if (-not (Test-Path "backend")) {
    Write-Host "Error: backend folder not found!" -ForegroundColor Red
    exit 1
}

# Generate random JWT secret
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Create content
$content = @"
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/car_rental

# JWT Secret (Auto-generated)
JWT_SECRET=$jwtSecret

# JWT Token Expiration
JWT_EXPIRE=30d

# Server Configuration  
PORT=5000
FRONTEND_URL=http://localhost:3000

# Optional
SESSION_SECRET=session_secret_key
MAX_FILE_SIZE=10485760
"@

# Write to file
$content | Out-File -FilePath "backend\.env" -Encoding UTF8 -NoNewline

Write-Host "Success! Created backend/.env file" -ForegroundColor Green
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "- MongoDB: mongodb://127.0.0.1:27017/car_rental" -ForegroundColor Gray  
Write-Host "- Port: 5000" -ForegroundColor Gray
Write-Host "- JWT Secret: Generated" -ForegroundColor Gray
Write-Host ""
Write-Host "Next: Start backend server with 'npm run dev'" -ForegroundColor Yellow
