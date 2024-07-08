const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    role: {
        type: String,
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false,
    },
    points: {
        type: Number,
        default: 100,
    },
    currentQuestion: {
        type: Number,
        default: 1,
    },
    questionsAnswered: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        attempts: { type: Number, default: 0 },
        correct: { type: Boolean, default: false },
        manuallyCompleted: { type: Boolean, default: false }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
