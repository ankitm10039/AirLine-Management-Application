const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

// Get current user's profile
exports.getMyProfile = async (req, res, next) => {
  try {
    // Find profile by user ID
    let profile = await UserProfile.findOne({ user: req.user.id });
    
    // If profile doesn't exist, create a new one
    if (!profile) {
      profile = await UserProfile.create({
        user: req.user.id,
        preferences: {
          theme: 'System',
          language: 'English',
          emailNotifications: true,
          smsNotifications: false,
          marketingEmails: true
        }
      });
    }
    
    // Get user data
    const user = await User.findById(req.user.id);
    
    // Combine user and profile data
    const userData = {
      ...user.toObject(),
      profile: profile.toObject()
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        profile: userData
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update current user's profile
exports.updateMyProfile = async (req, res, next) => {
  try {
    // Find profile by user ID
    let profile = await UserProfile.findOne({ user: req.user.id });
    
    // If profile doesn't exist, create a new one
    if (!profile) {
      profile = await UserProfile.create({
        user: req.user.id,
        ...req.body
      });
    } else {
      // Update existing profile
      profile = await UserProfile.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
    }
    
    // Get updated user data
    const user = await User.findById(req.user.id);
    
    // Combine user and profile data
    const userData = {
      ...user.toObject(),
      profile: profile.toObject()
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        profile: userData
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add activity to user profile
exports.addActivity = async (req, res, next) => {
  try {
    const { title, description, icon, color } = req.body;
    
    // Find profile by user ID
    let profile = await UserProfile.findOne({ user: req.user.id });
    
    // If profile doesn't exist, create a new one
    if (!profile) {
      profile = await UserProfile.create({
        user: req.user.id,
        recentActivities: [{
          title,
          description,
          icon,
          color,
          timestamp: new Date()
        }]
      });
    } else {
      // Add new activity to the beginning of the array
      profile.recentActivities.unshift({
        title,
        description,
        icon,
        color,
        timestamp: new Date()
      });
      
      // Limit to 10 most recent activities
      if (profile.recentActivities.length > 10) {
        profile.recentActivities = profile.recentActivities.slice(0, 10);
      }
      
      await profile.save();
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        activities: profile.recentActivities
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add login history entry
exports.addLoginHistory = async (req, res, next) => {
  try {
    const { ipAddress, device, browser, location } = req.body;
    
    // Find profile by user ID
    let profile = await UserProfile.findOne({ user: req.user.id });
    
    // If profile doesn't exist, create a new one
    if (!profile) {
      profile = await UserProfile.create({
        user: req.user.id,
        loginHistory: [{
          ipAddress,
          device,
          browser,
          location,
          timestamp: new Date()
        }]
      });
    } else {
      // Add new login history entry to the beginning of the array
      profile.loginHistory.unshift({
        ipAddress,
        device,
        browser,
        location,
        timestamp: new Date()
      });
      
      // Limit to 10 most recent logins
      if (profile.loginHistory.length > 10) {
        profile.loginHistory = profile.loginHistory.slice(0, 10);
      }
      
      await profile.save();
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        loginHistory: profile.loginHistory
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update user preferences
exports.updatePreferences = async (req, res, next) => {
  try {
    // Find profile by user ID
    let profile = await UserProfile.findOne({ user: req.user.id });
    
    // If profile doesn't exist, create a new one
    if (!profile) {
      profile = await UserProfile.create({
        user: req.user.id,
        preferences: req.body
      });
    } else {
      // Update preferences
      profile.preferences = {
        ...profile.preferences,
        ...req.body
      };
      
      await profile.save();
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        preferences: profile.preferences
      }
    });
  } catch (error) {
    next(error);
  }
};