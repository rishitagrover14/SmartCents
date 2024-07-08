const User = require('../models/user');
const Income = require('../models/income');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utilis/jwtToken');
const ErrorHandler = require("../utilis/errorHandler");
const bcrypt = require('bcryptjs');
const addDefaultCategories = async (userId) => {
  const defaultCategories = [
    { name: 'Monthly Rent', type: '', amount: 0 },
    { name: 'Grocery', type: '', amount: 0 },
    { name: 'Transportation', type: '', amount: 0 },
    { name: 'Monthly Bills', type: '', amount: 0 },
    { name: 'Dining Out', type: '', amount: 0 },
    { name: 'Holidays', type: '', amount: 0 },
    { name: 'Entertainment Subscriptions', type: '', amount: 0 },
    { name: 'Clothes Shopping', type: '', amount: 0 }
  ];

  await Income.create({
    name: 'User Income',
    amount: 0,
    necessities: 0,
    wants: 0,
    savings: 0,
    currentNecessities: 0,
    currentWants: 0,
    currentSavings: 0,
    categories: defaultCategories,
    user: userId
  });
};

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
  });

  // Add default categories for the new user
  await addDefaultCategories(user._id);

  sendToken(user, 200, res);
});

// Login User  =>  /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Finding user in Database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});
// Get currently logged in user data  /api/v1/currentUser
exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
});

// Logout User  =>  /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    next(error);
  }
});
