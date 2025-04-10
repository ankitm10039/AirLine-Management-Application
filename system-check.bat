@echo off
echo ===== Airline Management App System Check =====
echo.

echo Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed or not in PATH
  echo Please install Node.js from https://nodejs.org/
  goto :error
) else (
  echo Node.js is installed.
)
echo.

echo Checking NPM installation...
npm --version
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: NPM is not installed or not in PATH
  goto :error
) else (
  echo NPM is installed.
)
echo.

echo Checking MongoDB...
cd frontend\backend
node -e "require('mongoose').connect('mongodb://127.0.0.1:27017/test', { serverSelectionTimeoutMS: 5000 }).then(() => { console.log('MongoDB is running'); process.exit(0); }).catch(err => { console.error('MongoDB connection error:', err); process.exit(1); })"
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: MongoDB is not running or not accessible
  echo Please make sure MongoDB is installed and running
  echo Run the setup-mongodb.js script for help: node setup-mongodb.js
  goto :error
) else (
  echo MongoDB is running.
)
echo.

echo Checking backend dependencies...
if not exist "node_modules" (
  echo WARNING: Backend dependencies are not installed
  echo Run 'npm install' in the frontend/backend directory
) else (
  echo Backend dependencies are installed.
)
echo.

cd ..\quasar-project
echo Checking frontend dependencies...
if not exist "node_modules" (
  echo WARNING: Frontend dependencies are not installed
  echo Run 'npm install' in the frontend/quasar-project directory
) else (
  echo Frontend dependencies are installed.
)
echo.

cd ..\..
echo ===== System Check Complete =====
echo.
echo If any issues were found, please refer to the TROUBLESHOOTING.md file
echo for detailed instructions on how to resolve them.
echo.
echo Next steps:
echo 1. Run start-backend.bat to start the backend server
echo 2. Run start-frontend.bat to start the frontend server
echo 3. Run seed-database.bat to populate the database with sample data
echo.
goto :end

:error
echo.
echo System check failed. Please fix the issues above before continuing.
echo See TROUBLESHOOTING.md for more information.
echo.

:end
pause