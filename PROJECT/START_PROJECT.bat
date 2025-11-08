@echo off
echo ========================================
echo    BookBuddy Hotel Management System
echo ========================================
echo.

echo 🚀 Starting BookBuddy Project...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if PostgreSQL is running
echo 📊 Checking PostgreSQL connection...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL is not installed or not in PATH.
    echo Please install PostgreSQL and add it to your PATH.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!
echo.

REM Navigate to backend directory
echo 📁 Setting up backend...
cd /d "%~dp0backend"

REM Install backend dependencies
echo 📦 Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  .env file not found. Creating from template...
    copy "env.example" ".env"
    echo ✅ .env file created. Please update with your database credentials.
)

REM Setup database
echo 🗄️  Setting up database...
call node scripts/setup-database.js
if %errorlevel% neq 0 (
    echo ❌ Database setup failed.
    echo Please check your PostgreSQL connection and credentials.
    pause
    exit /b 1
)

echo ✅ Database setup completed!
echo.

REM Start backend server
echo 🚀 Starting backend server...
start "BookBuddy Backend" cmd /k "npm run dev"

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Navigate to frontend directory
echo 📁 Opening frontend...
cd /d "%~dp0dbms project"

REM Open frontend in default browser
echo 🌐 Opening frontend in browser...
start "" "index.html"

echo.
echo ========================================
echo    BookBuddy is now running!
echo ========================================
echo.
echo 📊 Backend: http://localhost:5000
echo 🌐 Frontend: Open index.html in your browser
echo.
echo Press any key to stop the backend server...
pause >nul

REM Stop backend server
echo 🛑 Stopping backend server...
taskkill /f /im node.exe >nul 2>&1

echo ✅ BookBuddy stopped successfully!
pause
