@echo off
echo Starting Airline Management Backend Server...
echo.

cd frontend\backend

echo Checking MongoDB connection...
node checkDb.js

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo MongoDB connection failed. Please make sure MongoDB is running.
  echo Run the setup-mongodb.js script for help: node setup-mongodb.js
  echo.
  pause
  exit /b 1
)

echo.
echo Starting backend server...
echo.
npm run dev

pause