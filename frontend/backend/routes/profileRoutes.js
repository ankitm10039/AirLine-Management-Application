const express = require('express');
const profileController = require('../controllers/profileController');
const authController = require('../controllers/authController');

const router = express.Router();

// All profile routes require authentication
router.use(authController.protect);

// User profile routes
router.get('/me', profileController.getMyProfile);
router.patch('/me', profileController.updateMyProfile);
router.post('/activity', profileController.addActivity);
router.post('/login-history', profileController.addLoginHistory);
router.patch('/preferences', profileController.updatePreferences);

module.exports = router;