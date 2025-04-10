# Registration Troubleshooting Guide

If you're experiencing issues with user registration in the Airline Management App, this guide will help you resolve common problems.

## Common Registration Errors

### "Password is required"

This error occurs when the password field is missing or empty when submitting the registration form.

**Solution:**
1. Make sure you've entered a password in the password field
2. Ensure the password meets the requirements:
   - At least 8 characters long
   - Contains at least one uppercase letter
   - Contains at least one number

### "Email already exists"

This error occurs when trying to register with an email address that's already in use.

**Solution:**
1. Use a different email address
2. If you already have an account, use the login page instead

### "Network Error" or "Cannot connect to server"

This error occurs when the frontend cannot communicate with the backend server.

**Solution:**
1. Make sure the backend server is running
2. Run `start-backend.bat` from the project root directory
3. Check if MongoDB is running
4. Check the console for any error messages

## Testing Registration

You can test the registration functionality using the provided test script:

1. Make sure the backend server is running
2. Run `test-registration.bat` from the project root directory
3. Check the console output for any errors

## Manual Registration Testing

If you want to test registration manually:

1. Open the application in your browser
2. Navigate to the signup page
3. Fill in all required fields:
   - First Name
   - Last Name
   - Email
   - Phone Number
   - Password (at least 8 characters with one uppercase letter and one number)
   - Confirm Password
   - Role
4. Accept the Terms and Conditions
5. Click the "Sign Up" button

## Checking the Database

If you want to verify that users are being saved correctly:

1. Open MongoDB Compass
2. Connect to `mongodb://127.0.0.1:27017`
3. Open the `airline-management` database
4. Check the `users` collection
5. Verify that user records have all required fields, including:
   - firstName
   - lastName
   - email
   - password (this will be hashed)
   - role

## Still Having Issues?

If you're still experiencing problems after trying these solutions:

1. Check the backend logs for detailed error messages
2. Try clearing your browser cache and cookies
3. Try using a different browser
4. Make sure all dependencies are installed by running `install-dependencies.bat`