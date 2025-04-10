@echo off
echo Installing dependencies for Airline Management App...
echo.

echo Installing root dependencies...
npm install
echo.

echo Installing backend dependencies...
cd frontend\backend
npm install
echo.

echo Installing frontend dependencies...
cd ..\quasar-project
npm install
echo.

echo All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Run start-backend.bat to start the backend server
echo 3. Run start-frontend.bat to start the frontend server
echo 4. Run seed-database.bat to populate the database with sample data
echo.

pause