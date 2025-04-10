# Troubleshooting Guide for Airline Management App

This guide will help you resolve common issues that may occur when setting up and running the Airline Management Application.

## MongoDB Connection Issues

### Error: "MongoDB connection error" or "Cannot connect to MongoDB"

1. **Check if MongoDB is installed and running:**
   - On Windows, open Services (services.msc) and check if "MongoDB Server" is running
   - Alternatively, run `mongod --version` in Command Prompt to check if MongoDB is installed

2. **Try using 127.0.0.1 instead of localhost:**
   - Edit the `.env` file in the `frontend/backend` directory
   - Change `MONGO_URI=mongodb://localhost:27017/airline-management` to `MONGO_URI=mongodb://127.0.0.1:27017/airline-management`

3. **Check MongoDB port:**
   - The default MongoDB port is 27017
   - Make sure no other service is using this port
   - You can check with: `netstat -ano | findstr 27017`

4. **Run the MongoDB setup helper:**
   ```
   cd frontend/backend
   node setup-mongodb.js
   ```

## Backend Server Issues

### Error: "Cannot connect to the server" or "Connection refused"

1. **Check if the backend server is running:**
   - Make sure you've started the backend with `npm run dev` in the `frontend/backend` directory
   - Check the console for any error messages

2. **Check if the port is already in use:**
   - The default port is 5000
   - If it's in use, change it in the `.env` file and update the frontend axios configuration

3. **Check firewall settings:**
   - Make sure your firewall isn't blocking the connection
   - Try temporarily disabling the firewall to test

### Error: "Module not found" or "Cannot find module"

1. **Reinstall dependencies:**
   ```
   cd frontend/backend
   npm install
   ```

2. **Check for missing dependencies:**
   - Look at the error message to identify the missing module
   - Install it manually: `npm install <module-name>`

## Frontend Issues

### Error: "Failed to compile" or "Module not found"

1. **Reinstall dependencies:**
   ```
   cd frontend/quasar-project
   npm install
   ```

2. **Clear cache:**
   ```
   cd frontend/quasar-project
   npm cache clean --force
   ```

### Error: "Network Error" when making API calls

1. **Check CORS settings:**
   - Make sure the backend CORS configuration allows requests from the frontend origin
   - The default configuration allows requests from `http://localhost:9000` and `http://localhost:8080`

2. **Check API base URL:**
   - Make sure the axios base URL matches your backend server address
   - Default is `http://localhost:5000/api`

## Authentication Issues

### Error: "Invalid email or password" when using correct credentials

1. **Check if the database is seeded:**
   - Run the seeder script: `cd frontend/backend && node seeders/seed.js`

2. **Try with default credentials:**
   - Email: `admin@example.com`
   - Password: `admin123`

3. **Check the JWT secret:**
   - Make sure the JWT_SECRET in the `.env` file is set correctly

### Registration Issues

If you're having problems with user registration, please refer to the detailed [Registration Troubleshooting Guide](REGISTRATION_TROUBLESHOOTING.md) for specific solutions.

## Database Issues

### Error: "Duplicate key error" when seeding the database

1. **Clear the existing data:**
   - The seeder script should clear existing data, but if it fails:
   - Use MongoDB Compass to connect to your database and manually delete collections

2. **Run the seeder again:**
   ```
   cd frontend/backend
   node seeders/seed.js
   ```

## Still Having Issues?

If you're still experiencing problems after trying these solutions:

1. **Check the logs:**
   - Backend logs in the terminal where you started the server
   - Frontend logs in the browser console (F12 > Console)

2. **Try a clean installation:**
   - Delete the `node_modules` folders in both frontend and backend directories
   - Run `npm install` in both directories again

3. **Check for system requirements:**
   - Node.js version 14 or higher
   - MongoDB version 4.4 or higher
   - NPM version 6 or higher