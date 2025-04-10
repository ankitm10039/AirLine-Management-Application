# Airline Management Application

A full-stack application for managing airline operations, including flight management, bookings, and user management.

## Getting Started

**For Windows users:** Simply run the `GETTING_STARTED.bat` file and follow the interactive prompts to set up and run the application.

## Project Structure

- `frontend/quasar-project`: Frontend application built with Quasar Framework (Vue.js)
- `frontend/backend`: Backend API built with Node.js, Express, and MongoDB

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

### Quick Start (Windows)

1. Run `install-dependencies.bat` to install all required dependencies
2. Run `system-check.bat` to verify your system is properly configured
3. Run `start-all.bat` to start both backend and frontend servers
4. Run `seed-database.bat` to populate the database with sample data

### Available Scripts

- `install-dependencies.bat` - Installs all dependencies for backend and frontend
- `system-check.bat` - Checks if your system meets all requirements
- `start-all.bat` - Starts both backend and frontend servers
- `start-backend.bat` - Starts only the backend server
- `start-frontend.bat` - Starts only the frontend server
- `seed-database.bat` - Populates the database with sample data

### MongoDB Setup

1. Install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Make sure the MongoDB service is running
3. For help with MongoDB setup, run:
   ```
   cd frontend/backend
   node setup-mongodb.js
   ```

### Manual Backend Setup

1. Navigate to the backend directory:
   ```
   cd frontend/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Make sure the `.env` file in the backend directory has the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/airline-management
   JWT_SECRET=airline_management_secret_key_12345
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. Check MongoDB connection:
   ```
   node checkDb.js
   ```

5. Seed the database with initial data:
   ```
   node seeders/seed.js
   ```

6. Start the backend server:
   ```
   npm run dev
   ```

### Manual Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend/quasar-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Troubleshooting

If you encounter any issues:

1. Run `system-check.bat` to identify common problems
2. Refer to the detailed `TROUBLESHOOTING.md` guide for solutions to common issues
3. For registration-specific issues, see the `REGISTRATION_TROUBLESHOOTING.md` guide
4. Make sure MongoDB is running (check Windows Services)
5. Check that the backend server is running on port 5000
6. Verify that the MONGO_URI in the .env file is correct
7. If using Windows, try using `127.0.0.1` instead of `localhost` in the connection string

For detailed troubleshooting steps, see the [Troubleshooting Guide](TROUBLESHOOTING.md) or the [Registration Troubleshooting Guide](REGISTRATION_TROUBLESHOOTING.md).

## Default Users

After seeding the database, you can log in with the following credentials:

- Administrator:
  - Email: admin@example.com
  - Password: admin123

- Staff:
  - Email: staff@example.com
  - Password: staff123

- Regular User:
  - Email: user@example.com
  - Password: user123

## Features

- User authentication and authorization
- Flight management (create, update, delete flights)
- Booking management
- User profile management
- Dashboard with analytics
- Responsive design for desktop and mobile

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user
- `PATCH /api/auth/updatePassword`: Update password

### Flights

- `GET /api/flights`: Get all flights
- `GET /api/flights/:id`: Get a specific flight
- `POST /api/flights`: Create a new flight
- `PATCH /api/flights/:id`: Update a flight
- `DELETE /api/flights/:id`: Delete a flight
- `GET /api/flights/stats/flight-stats`: Get flight statistics

### Bookings

- `GET /api/bookings`: Get all bookings (admin/staff only)
- `GET /api/bookings/my-bookings`: Get current user's bookings
- `GET /api/bookings/:id`: Get a specific booking
- `POST /api/bookings`: Create a new booking
- `PATCH /api/bookings/:id`: Update a booking
- `PATCH /api/bookings/:id/cancel`: Cancel a booking
- `GET /api/bookings/stats/booking-stats`: Get booking statistics (admin/staff only)

### Users

- `GET /api/users`: Get all users (admin only)
- `GET /api/users/:id`: Get a specific user (admin only)
- `PATCH /api/users/updateMe`: Update current user
- `DELETE /api/users/deleteMe`: Delete current user
- `PATCH /api/users/:id`: Update a user (admin only)
- `DELETE /api/users/:id`: Delete a user (admin only)