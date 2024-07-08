// models/Income.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please specify category name'],
    },
    type: {
        type: String,
        enum: ['', 'Necessity', 'Want'],
        default: '' // no type initially
    },
    amount: {
        type: Number,
        default: 0
    }
});

const incomeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please specify name']
    },
    amount: {
        type: Number,
        required: [true, 'Please specify total income amount']
    },
    necessities: {
        type: Number,
        default: 0
    },
    wants: {
        type: Number,
        default: 0
    },
    savings: {
        type: Number,
        default: 0
    },
    currentNecessities: {
        type: Number,
        default: 0
    },
    currentWants: {
        type: Number,
        default: 0
    },
    currentSavings: {
        type: Number,
        default: 0
    },
    categories: [categorySchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Income || mongoose.model('Income', incomeSchema);
