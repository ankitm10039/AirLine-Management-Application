const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      unique: true,
      trim: true
    },
    origin: {
      type: String,
      required: [true, 'Origin is required'],
      trim: true
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true
    },
    departureTime: {
      type: Date,
      required: [true, 'Departure time is required']
    },
    arrivalTime: {
      type: Date,
      required: [true, 'Arrival time is required']
    },
    aircraftType: {
      type: String,
      required: [true, 'Aircraft type is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Boarding', 'Departed', 'In Air', 'Landed', 'Arrived', 'Delayed', 'Cancelled', 'Diverted'],
      default: 'Scheduled'
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1']
    },
    availableSeats: {
      type: Number,
      min: 0
    },
    price: {
      economy: {
        type: Number,
        required: [true, 'Economy price is required'],
        min: [0, 'Price cannot be negative']
      },
      business: {
        type: Number,
        required: [true, 'Business price is required'],
        min: [0, 'Price cannot be negative']
      },
      firstClass: {
        type: Number,
        required: [true, 'First class price is required'],
        min: [0, 'Price cannot be negative']
      }
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for calculating flight duration
flightSchema.virtual('duration').get(function() {
  return (this.arrivalTime - this.departureTime) / (1000 * 60 * 60); // Duration in hours
});

// Set availableSeats equal to capacity when creating a new flight
flightSchema.pre('save', function(next) {
  if (this.isNew) {
    this.availableSeats = this.capacity;
  }
  next();
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;