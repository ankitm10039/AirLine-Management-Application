/**
 * MongoDB Setup Helper
 * 
 * This script provides instructions for setting up MongoDB on Windows
 * and verifies if MongoDB is running locally.
 */

const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== MongoDB Setup Helper ===');
console.log('This script will help you set up MongoDB for the Airline Management App.\n');

// Check if MongoDB is installed and running
function checkMongoDBRunning() {
  console.log('Checking if MongoDB is running...');
  
  // Try to connect to MongoDB
  mongoose.connect('mongodb://127.0.0.1:27017/test', { 
    serverSelectionTimeoutMS: 5000 // 5 second timeout
  })
  .then(() => {
    console.log('✅ MongoDB is running!');
    mongoose.disconnect();
    setupDatabase();
  })
  .catch(err => {
    console.log('❌ MongoDB is not running or not accessible.');
    console.log('Error:', err.message);
    
    // Check if MongoDB is installed
    checkMongoDBInstalled();
  });
}

// Check if MongoDB is installed
function checkMongoDBInstalled() {
  console.log('\nChecking if MongoDB is installed...');
  
  // Common paths where MongoDB might be installed on Windows
  const commonPaths = [
    'C:\\Program Files\\MongoDB\\Server',
    'C:\\Program Files (x86)\\MongoDB\\Server'
  ];
  
  let found = false;
  
  for (const basePath of commonPaths) {
    if (fs.existsSync(basePath)) {
      // Look for version directories
      const items = fs.readdirSync(basePath);
      for (const item of items) {
        const fullPath = path.join(basePath, item);
        if (fs.statSync(fullPath).isDirectory() && /^\d+\.\d+$/.test(item)) {
          found = true;
          console.log(`✅ MongoDB appears to be installed at: ${fullPath}`);
          break;
        }
      }
    }
    if (found) break;
  }
  
  if (!found) {
    console.log('❌ MongoDB does not appear to be installed.');
    provideInstallationInstructions();
  } else {
    provideStartInstructions();
  }
}

// Provide instructions for installing MongoDB
function provideInstallationInstructions() {
  console.log('\n=== MongoDB Installation Instructions ===');
  console.log('1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community');
  console.log('2. Run the installer and follow the installation wizard');
  console.log('3. Choose "Complete" installation');
  console.log('4. Install MongoDB Compass (the GUI) when prompted');
  console.log('5. After installation, MongoDB should start automatically as a Windows service');
  console.log('\nAlternatively, you can use MongoDB Atlas (cloud database):');
  console.log('1. Create a free account at: https://www.mongodb.com/cloud/atlas/register');
  console.log('2. Create a new cluster');
  console.log('3. Configure network access to allow connections from your IP');
  console.log('4. Create a database user');
  console.log('5. Get your connection string and update it in the .env file');
  
  askToExit();
}

// Provide instructions for starting MongoDB
function provideStartInstructions() {
  console.log('\n=== Starting MongoDB ===');
  console.log('MongoDB should be running as a Windows service. If it\'s not:');
  console.log('1. Open Services (services.msc)');
  console.log('2. Find "MongoDB Server" in the list');
  console.log('3. Right-click and select "Start"');
  console.log('\nAlternatively, you can start MongoDB manually:');
  console.log('1. Open Command Prompt as Administrator');
  console.log('2. Run: net start MongoDB');
  
  askToTryAgain();
}

// Ask if user wants to try connecting again
function askToTryAgain() {
  rl.question('\nDo you want to try connecting to MongoDB again? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      checkMongoDBRunning();
    } else {
      askToExit();
    }
  });
}

// Setup the database for the application
function setupDatabase() {
  console.log('\n=== Setting up the Airline Management Database ===');
  console.log('1. Make sure your .env file has the correct MongoDB connection string');
  console.log('   Current connection string in .env: ' + (process.env.MONGO_URI || 'Not found'));
  console.log('2. To seed the database with initial data, run:');
  console.log('   node seeders/seed.js');
  
  askToExit();
}

// Ask if user wants to exit
function askToExit() {
  rl.question('\nPress Enter to exit...', () => {
    rl.close();
  });
}

// Start the process
checkMongoDBRunning();