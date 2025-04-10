{status: "error",  "User validation failed: password: Password is required"}
message
: 
"User validation failed: password: Password is required"
status
: 
"error"
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/airline-management';

console.log('Attempting to connect to MongoDB at:', MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });