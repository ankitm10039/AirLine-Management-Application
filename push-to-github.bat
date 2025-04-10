@echo off
echo Initializing Git repository...
git init

echo Adding files to Git...
git add .

echo Committing files...
git commit -m "Initial commit: Airline Management Application"

echo Adding remote repository...
git remote add origin https://github.com/ankitm10039/AirLine-Management-Application.git

echo Pushing to GitHub...
git push -u origin master

echo Done! Your code has been pushed to GitHub.
pause