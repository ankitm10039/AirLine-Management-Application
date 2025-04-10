@echo off
echo ===== Starting Airline Management App =====
echo.

echo Running system check...
call system-check.bat
if %ERRORLEVEL% NEQ 0 (
  echo System check failed. Please fix the issues before continuing.
  pause
  exit /b 1
)

echo.
echo Starting backend and frontend servers...
echo.

start cmd /k "title Airline Management Backend && cd frontend\backend && npm run dev"
timeout /t 5 > nul
start cmd /k "title Airline Management Frontend && cd frontend\quasar-project && npm run dev"

echo.
echo Servers started in separate windows.
echo.
echo - Backend running at: http://localhost:5000
echo - Frontend running at: http://localhost:9000
echo.
echo Default login credentials:
echo - Admin: admin@example.com / admin123
echo - Staff: staff@example.com / staff123
echo - User: user@example.com / user123
echo.

pause