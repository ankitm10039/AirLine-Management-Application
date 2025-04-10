const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    flight: {
      type: mongoose.Schema.ObjectId,
      ref: 'Flight',
      required: [true, 'Booking must belong to a Flight']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Booking must belong to a User']
    },
    passengers: [
      {
        firstName: {
          type: String,
          required: [true, 'First name is required'],
          trim: true
        },
        lastName: {
          type: String,
          required: [true, 'Last name is required'],
          trim: true
        },
        dateOfBirth: {
          type: Date,
          required: [true, 'Date of birth is required']
        },
        passportNumber: {
          type: String,
          required: [true, 'Passport number is required'],
          trim: true
        },
        seatNumber: {
          type: String,
          trim: true
        },
        seatClass: {
          type: String,
          enum: ['Economy', 'Business', 'First Class'],
          default: 'Economy'
        }
      }
    ],
    bookingDate: {
      type: Date,
      default: Date.now
    },
    totalPrice: {
      type: Number,
      required: [true, 'Booking must have a price']
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Checked In', 'Boarded', 'Completed', 'Cancelled', 'No Show'],
      default: 'Confirmed'
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed', 'Refunded'],
      default: 'Paid'
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Cash'],
      default: 'Credit Card'
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Populate flight and user data when querying
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'flight',
    select: 'flightNumber origin destination departureTime arrivalTime status'
  }).populate({
    path: 'user',
    select: 'firstName lastName email'
  });
  next();
});

// Update flight's available seats after booking is created
bookingSchema.post('save', async function() {
  try {
    const Flight = mongoose.model('Flight');
    const flight = await Flight.findById(this.flight);
    
    if (flight) {
      flight.availableSeats = Math.max(0, flight.availableSeats - this.passengers.length);
      await flight.save();
    }
  } catch (error) {
    console.error('Error updating flight available seats:', error);
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;