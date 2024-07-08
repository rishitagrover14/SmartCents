const User = require('../models/User');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utilis/errorHandler");

exports.investPoints = catchAsyncErrors(
    async (req, res) => {
    const { investmentPoints } = req.body;
  
    if (!investmentPoints) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.points < investmentPoints) {
        return res.status(400).json({ message: 'Insufficient points' });
      }
  
      // Deduct points
      user.points -= investmentPoints;
      await user.save();
  
      res.status(200).json({ message: 'Investment successful', points: user.points });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
)