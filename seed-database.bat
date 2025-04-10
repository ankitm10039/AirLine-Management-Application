{status: "error", message: "User validation failed: password: Password is required"}
message
: 
"User validation failed: password: Password is required"
status
: 
"error"@echo off
echo Seeding Airline Management Database...
echo.

cd frontend\backend

echo Running database seeder...
echo.
node seeders/seed.js

pause