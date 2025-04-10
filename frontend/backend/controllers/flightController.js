const Flight = require('../models/Flight');
const APIFeatures = require('../utils/apiFeatures');

// Get all flights with filtering, sorting, and pagination
exports.getAllFlights = async (req, res, next) => {
  try {
    console.log('Get all flights with query:', req.query);
    
    // Create a features instance with the Flight model and request query
    const features = new APIFeatures(Flight.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    
    // Execute the query
    const flights = await features.query;
    
    // Send response
    res.status(200).json({
      status: 'success',
      results: flights.length,
      data: {
        flights
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get a single flight
exports.getFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({
        status: 'error',
        message: 'No flight found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        flight
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create a new flight
exports.createFlight = async (req, res, next) => {
  try {
    const newFlight = await Flight.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        flight: newFlight
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update a flight
exports.updateFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!flight) {
      return res.status(404).json({
        status: 'error',
        message: 'No flight found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        flight
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete a flight
exports.deleteFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({
        status: 'error',
        message: 'No flight found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Get flight statistics
exports.getFlightStats = async (req, res, next) => {
  try {
    const stats = await Flight.aggregate([
      {
        $match: { status: { $ne: 'Cancelled' } }
      },
      {
        $group: {
          _id: '$status',
          numFlights: { $sum: 1 },
          avgCapacity: { $avg: '$capacity' },
          avgAvailableSeats: { $avg: '$availableSeats' }
        }
      },
      {
        $sort: { numFlights: -1 }
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