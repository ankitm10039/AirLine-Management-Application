const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const APIFeatures = require('../utils/apiFeatures');

// Get all bookings with filtering, sorting, and pagination
exports.getAllBookings = async (req, res, next) => {
  try {
    console.log('Get all bookings with query:', req.query);
    
    let filter = {};
    
    // If user is not admin or staff, only show their own bookings
    if (req.user.role !== 'Administrator' && req.user.role !== 'Staff') {
      filter = { user: req.user.id };
    }
    
    // Create a features instance with the Booking model and request query
    const features = new APIFeatures(Booking.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    
    // Execute the query
    const bookings = await features.query;
    
    // Get total count for pagination
    const totalCount = await Booking.countDocuments(filter);
    
    // Send response
    res.status(200).json({
      status: 'success',
      results: bookings.length,
      totalCount,
      data: {
        bookings
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    next(error);
  }
};

// Get a single booking
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'No booking found with that ID'
      });
    }
    
    // Check if user is authorized to view this booking
    if (req.user.role !== 'Administrator' && booking.user.id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to view this booking'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    // Check if flight exists and has enough seats
    const flight = await Flight.findById(req.body.flight);
    
    if (!flight) {
      return res.status(404).json({
        status: 'error',
        message: 'No flight found with that ID'
      });
    }
    
    if (flight.availableSeats < req.body.passengers.length) {
      return res.status(400).json({
        status: 'error',
        message: `Not enough seats available. Only ${flight.availableSeats} seats left.`
      });
    }
    
    // Set user ID from authenticated user if not provided
    if (!req.body.user) {
      console.log('No user ID provided in request, using authenticated user:', req.user.id);
      req.body.user = req.user.id;
    } else {
      console.log('Using provided user ID:', req.body.user);
    }
    
    // Log the booking data before creation
    console.log('Creating booking with data:', {
      ...req.body,
      flight: req.body.flight,
      user: req.body.user,
      passengerCount: req.body.passengers?.length || 0
    });
    
    // Create booking
    const newBooking = await Booking.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update a booking
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'No booking found with that ID'
      });
    }
    
    // Check if user is authorized to update this booking
    if (req.user.role !== 'Administrator' && booking.user.id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to update this booking'
      });
    }
    
    // Don't allow changing flight or user
    delete req.body.flight;
    delete req.body.user;
    
    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        booking: updatedBooking
      }
    });
  } catch (error) {
    next(error);
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        status: 'error',
        message: 'No booking found with that ID'
      });
    }
    
    // Check if user is authorized to cancel this booking
    if (req.user.role !== 'Administrator' && booking.user.id !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to cancel this booking'
      });
    }
    
    // Update booking status to cancelled
    booking.status = 'Cancelled';
    await booking.save();
    
    // Update flight's available seats
    const flight = await Flight.findById(booking.flight.id);
    if (flight) {
      flight.availableSeats += booking.passengers.length;
      await flight.save();
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get booking statistics by month
exports.getBookingStats = async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      {
        $match: { status: { $ne: 'Cancelled' } }
      },
      {
        $group: {
          _id: { $month: '$bookingDate' },
          numBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
          avgPrice: { $avg: '$totalPrice' }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: { _id: 0 }
      }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get booking statistics by status
exports.getBookingStatsByStatus = async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};