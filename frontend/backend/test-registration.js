const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Test user data
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  password: 'TestPassword123',
  role: 'User',
  phoneNumber: '+1234567890'
};

// API URL
const API_URL = 'http://localhost:5000/api';

// Function to test registration
async function testRegistration() {
  console.log('Testing user registration...');
  console.log('User data:', {
    ...testUser,
    password: '********' // Hide password in logs
  });
  
  try {
    const response = await axios.post(`${API_URL}/auth/register`, testUser);
    
    console.log('\n✅ Registration successful!');
    console.log('Status:', response.status);
    console.log('Response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.log('\n❌ Registration failed!');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Status:', error.response.status);
      console.log('Response data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('No response received. Is the server running?');
      console.log('Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error message:', error.message);
    }
    
    throw error;
  }
}

// Function to test login with the registered user
async function testLogin(email, password) {
  console.log('\nTesting user login...');
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    console.log('\n✅ Login successful!');
    console.log('Status:', response.status);
    console.log('Response data:', response.data);
    
    return response.data;
  } catch (error) {
    console.log('\n❌ Login failed!');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', error.response.data);
    } else if (error.request) {
      console.log('No response received. Is the server running?');
    } else {
      console.log('Error message:', error.message);
    }
    
    throw error;
  }
}

// Run the tests
async function runTests() {
  try {
    // Test registration
    const registrationData = await testRegistration();
    
    // Test login with the registered user
    await testLogin(testUser.email, testUser.password);
    
    console.log('\n✅ All tests passed successfully!');
  } catch (error) {
    console.log('\n❌ Tests failed!');
  }
}

// Check if the server is running before starting tests
axios.get(`${API_URL}`)
  .then(() => {
    console.log('Server is running. Starting tests...\n');
    runTests();
  })
  .catch(error => {
    console.log('❌ Cannot connect to the server. Make sure it is running at', API_URL);
    console.log('Error:', error.message);
  });