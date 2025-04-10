const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// All booking routes require authentication
router.use(authController.protect);

// User routes
router.get('/my-bookings', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBooking);
router.patch('/:id', bookingController.updateBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);

// Admin only routes
router.use(authController.restrictTo('Administrator', 'Staff'));

router.get('/', bookingController.getAllBookings);
router.get('/stats/booking-stats', bookingController.getBookingStats);
router.get('/stats/status', bookingController.getBookingStatsByStatus);

module.exports = router;