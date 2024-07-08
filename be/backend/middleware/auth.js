const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utilis/errorHandler");
const User = require("../models/user");

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return next(new ErrorHandler("Please login into your account", 401));
  }

  // If token exists, verify the user
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
