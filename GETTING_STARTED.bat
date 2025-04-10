@echo off
color 0A
cls
echo ===============================================
echo    AIRLINE MANAGEMENT APPLICATION SETUP
echo ===============================================
echo.
echo Welcome to the Airline Management Application!
echo This script will guide you through the setup process.
echo.
echo Please select an option:
echo.
echo 1. First-time setup (install dependencies and check system)
echo 2. Start the application (backend and frontend)
echo 3. Seed the database with sample data
echo 4. Run system check
echo 5. View documentation
echo 6. Exit
echo.

:menu
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto setup
if "%choice%"=="2" goto start
if "%choice%"=="3" goto seed
if "%choice%"=="4" goto check
if "%choice%"=="5" goto docs
if "%choice%"=="6" goto end

echo Invalid choice. Please try again.
goto menu

:setup
cls
echo ===============================================
echo    FIRST-TIME SETUP
echo ===============================================
echo.
echo This will install all dependencies and check your system.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

call install-dependencies.bat
call system-check.bat

echo.
echo Setup complete! You can now start the application.
echo.
pause
cls
goto menu

:start
cls
echo ===============================================
echo    STARTING APPLICATION
echo ===============================================
echo.
echo This will start both the backend and frontend servers.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

call start-all.bat
goto end

:seed
cls
echo ===============================================
echo    SEEDING DATABASE
echo ===============================================
echo.
echo This will populate the database with sample data.
echo Make sure MongoDB is running before proceeding.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

call seed-database.bat
cls
goto menu

:check
cls
echo ===============================================
echo    SYSTEM CHECK
echo ===============================================
echo.
echo This will check if your system meets all requirements.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

call system-check.bat
cls
goto menu

:docs
cls
echo ===============================================
echo    DOCUMENTATION
echo ===============================================
echo.
echo Opening documentation...
start "" notepad README.md
start "" notepad TROUBLESHOOTING.md
cls
goto menu

:end
cls
echo ===============================================
echo    THANK YOU FOR USING THE AIRLINE MANAGEMENT APP
echo ===============================================
echo.
echo If you encounter any issues, please refer to the
echo TROUBLESHOOTING.md file for solutions.
echo.
echo Goodbye!
echo.
pause