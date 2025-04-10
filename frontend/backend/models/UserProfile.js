const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Profile must belong to a user'],
      unique: true
    },
    bio: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      default: 'default-avatar.png'
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    department: {
      type: String,
      trim: true
    },
    jobTitle: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    socialLinks: {
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String
    },
    preferences: {
      theme: {
        type: String,
        enum: ['Light', 'Dark', 'System'],
        default: 'System'
      },
      language: {
        type: String,
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'],
        default: 'English'
      },
      emailNotifications: {
        type: Boolean,
        default: true
      },
      smsNotifications: {
        type: Boolean,
        default: false
      },
      marketingEmails: {
        type: Boolean,
        default: true
      }
    },
    recentActivities: [
      {
        title: String,
        description: String,
        timestamp: {
          type: Date,
          default: Date.now
        },
        icon: String,
        color: String
      }
    ],
    loginHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now
        },
        ipAddress: String,
        device: String,
        browser: String,
        location: String
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add index for faster queries
userProfileSchema.index({ user: 1 });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;