const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// Load environment variables
dotenv.config({ path: '../.env' });

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/airline-management';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'Administrator',
    phoneNumber: '+1234567890',
    address: {
      street: '123 Admin St',
      city: 'Admin City',
      state: 'AS',
      zipCode: '12345',
      country: 'USA'
    }
  },
  {
    firstName: 'Staff',
    lastName: 'Member',
    email: 'staff@example.com',
    password: 'staff123',
    role: 'Staff',
    phoneNumber: '+1987654321',
    address: {
      street: '456 Staff Ave',
      city: 'Staff City',
      state: 'SS',
      zipCode: '54321',
      country: 'USA'
    }
  },
  {
    firstName: 'Regular',
    lastName: 'User',
    email: 'user@example.com',
    password: 'user123',
    role: 'User',
    phoneNumber: '+1122334455',
    address: {
      street: '789 User Blvd',
      city: 'User City',
      state: 'US',
      zipCode: '67890',
      country: 'USA'
    }
  }
];

const flights = [
  {
    flightNumber: 'FL1001',
    origin: 'New York',
    destination: 'London',
    departureTime: new Date('2023-06-15T08:30:00Z'),
    arrivalTime: new Date('2023-06-15T20:45:00Z'),
    aircraftType: 'Boeing 787',
    status: 'Scheduled',
    capacity: 280,
    availableSeats: 280,
    price: {
      economy: 800,
      business: 2500,
      firstClass: 5000
    },
    notes: 'Regular international flight'
  },
  {
    flightNumber: 'FL1002',
    origin: 'London',
    destination: 'Paris',
    departureTime: new Date('2023-06-16T10:15:00Z'),
    arrivalTime: new Date('2023-06-16T11:45:00Z'),
    aircraftType: 'Airbus A320',
    status: 'Boarding',
    capacity: 180,
    availableSeats: 180,
    price: {
      economy: 200,
      business: 600,
      firstClass: 1200
    },
    notes: 'Short haul European flight'
  },
  {
    flightNumber: 'FL1003',
    origin: 'Tokyo',
    destination: 'Singapore',
    departureTime: new Date('2023-06-17T23:30:00Z'),
    arrivalTime: new Date('2023-06-18T05:45:00Z'),
    aircraftType: 'Boeing 777',
    status: 'Delayed',
    capacity: 300,
    availableSeats: 300,
    price: {
      economy: 600,
      business: 1800,
      firstClass: 3500
    },
    notes: 'Overnight flight with meal service'
  },
  {
    flightNumber: 'FL1004',
    origin: 'Dubai',
    destination: 'Sydney',
    departureTime: new Date('2023-06-18T02:10:00Z'),
    arrivalTime: new Date('2023-06-18T22:30:00Z'),
    aircraftType: 'Airbus A380',
    status: 'On Time',
    capacity: 520,
    availableSeats: 520,
    price: {
      economy: 1200,
      business: 3500,
      firstClass: 7000
    },
    notes: 'Long haul international flight'
  },
  {
    flightNumber: 'FL1005',
    origin: 'Los Angeles',
    destination: 'New York',
    departureTime: new Date('2023-06-19T14:20:00Z'),
    arrivalTime: new Date('2023-06-19T22:45:00Z'),
    aircraftType: 'Boeing 737',
    status: 'Cancelled',
    capacity: 160,
    availableSeats: 160,
    price: {
      economy: 300,
      business: 900,
      firstClass: 1800
    },
    notes: 'Domestic flight with Wi-Fi'
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Flight.deleteMany({});
    await Booking.deleteMany({});

    console.log('Previous data cleared');

    // Insert new data
    const createdUsers = await User.create(users);
    const createdFlights = await Flight.create(flights);

    console.log(`${createdUsers.length} users created`);
    console.log(`${createdFlights.length} flights created`);

    // Create some sample bookings
    const adminUser = createdUsers[0];
    const regularUser = createdUsers[2];
    const flight1 = createdFlights[0];
    const flight2 = createdFlights[1];

    const bookings = [
      {
        flight: flight1._id,
        user: adminUser._id,
        passengers: [
          {
            firstName: 'Admin',
            lastName: 'User',
            dateOfBirth: new Date('1980-01-01'),
            passportNumber: 'AB123456',
            seatNumber: '12A',
            seatClass: 'Business'
          }
        ],
        totalPrice: flight1.price.business,
        contactEmail: adminUser.email,
        contactPhone: adminUser.phoneNumber
      },
      {
        flight: flight2._id,
        user: regularUser._id,
        passengers: [
          {
            firstName: 'Regular',
            lastName: 'User',
            dateOfBirth: new Date('1990-05-15'),
            passportNumber: 'CD789012',
            seatNumber: '18F',
            seatClass: 'Economy'
          },
          {
            firstName: 'Family',
            lastName: 'Member',
            dateOfBirth: new Date('1992-08-20'),
            passportNumber: 'EF345678',
            seatNumber: '18E',
            seatClass: 'Economy'
          }
        ],
        totalPrice: flight2.price.economy * 2,
        contactEmail: regularUser.email,
        contactPhone: regularUser.phoneNumber
      }
    ];

    const createdBookings = await Booking.create(bookings);
    console.log(`${createdBookings.length} bookings created`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();