const express = require('express');
const flightController = require('../controllers/flightController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlight);

// Protected routes
router.use(authController.protect);

// Admin only routes
router.use(authController.restrictTo('Administrator', 'Staff'));

router.get('/stats/flight-stats', flightController.getFlightStats);
router.post('/', flightController.createFlight);
router.patch('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

module.exports = router;