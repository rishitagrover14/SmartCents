// controllers/incomeController.js

const Income = require("../models/income");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utilis/errorHandler");

// Add category and manage funds => /api/v1/income/addCategory
exports.addCategoryAndDeductAmount = catchAsyncErrors(
    async (req, res, next) => {
        const {categoryName, type, amount} = req.body;

        if (!categoryName || !type || !amount) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        let income = await Income.findOne({user: req.user.id});

        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Income document not found",
            });
        }
        
        // Check if category already exists
        let category = income.categories.find((cat) => cat.name === categoryName);

        if (category) {
            // If category exists, update amount
            category.type = type;
            category.amount += amount;
        } else {
            // If category does not exist, add new category
            category = {
                name: categoryName,
                type: type,
                amount: amount,
            };
            income.categories.push(category);
        }

        // Deduct amount from respective funds
        if (type === "Necessity") {
            if (income.currentNecessities >= amount) {
                income.currentNecessities -= amount;
            } else {
                let remaining = amount - income.currentNecessities;
                income.currentNecessities = 0;
                if (income.currentSavings >= remaining) {
                    income.currentSavings -= remaining;
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Insufficient funds in savings for this expense. Please adjust or update your income.",
                    });
                }
            }
        } else if (type === "Want") {
            if (income.currentWants >= amount) {
                income.currentWants -= amount;
            } else {
                let remaining = amount - income.currentWants;
                income.currentWants = 0;
                if (income.currentSavings >= remaining) {
                    income.currentSavings -= remaining;
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Insufficient funds in savings for this expense. Please adjust or update your income.",
                    });
                }
            }
        }

        await income.save();

        res.status(201).json({
            success: true,
            income,
        });
    }
);

exports.addMultipleCategory = catchAsyncErrors(async (req, res, next) => {
    const {categories} = req.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Categories array is required",
        });
    }

    // Validate each category
    categories.forEach((category) => {
        if (!category.name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }
        if (!category.type || !["", "Necessity", "Want"].includes(category.type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Category Type",
            });
        }
    });

    // Find the user's income document
    const userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    // Process each category
    categories.forEach((newCategory) => {
        const existingCategory = userIncome.categories.find(
            (category) => category.name === newCategory.name
        );

        if (existingCategory) {
            // If category exists, update its type
            existingCategory.type = newCategory.type;
        } else {
            // If category does not exist, add it
            userIncome.categories.push({
                name: newCategory.name,
                type: newCategory.type,
            });
        }
    });

    // Save the updated document
    await userIncome.save();

    res.status(200).json({
        success: true,
        message: "Categories added or updated successfully",
        income: userIncome,
    });
});

// Add income and divide into necessities, wants, and savings => /api/v1/income/add
exports.addIncome = catchAsyncErrors(async (req, res, next) => {
    const {income} = req.body;

    if (!income) {
        return res.status(400).json({
            success: false,
            message: "Please provide an income amount",
        });
    }

    let userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    // Calculate the division of the new income
    const newNecessities = (income * 0.5).toFixed(2);
    const newWants = (income * 0.3).toFixed(2);
    const newSavings = (income * 0.2).toFixed(2);

    // Update the existing values with the new calculated values
    userIncome.amount += income;
    userIncome.necessities += Number(newNecessities);
    userIncome.wants += Number(newWants);
    userIncome.savings += Number(newSavings);
    userIncome.currentNecessities += Number(newNecessities);
    userIncome.currentWants += Number(newWants);
    userIncome.currentSavings += Number(newSavings);

    await userIncome.save();

    res.status(201).json({
        success: true,
        income: userIncome,
    });
});

exports.getIncome = catchAsyncErrors(async (req, res, next) => {
    // Find income document for the current authenticated user
    const userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    // If income document is found, return it as JSON response
    res.status(200).json({
        success: true,
        income: userIncome,
    });
});

// Get all categories for the logged-in user => /api/v1/categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    const categoriesMap = new Map();

    userIncome.categories.forEach((category) => {
        if (!categoriesMap.has(category.name)) {
            categoriesMap.set(category.name, category);
        } else {
            // If a duplicate is found, compare amounts and keep the one with the higher amount
            const existingCategory = categoriesMap.get(category.name);
            if (category.amount > existingCategory.amount) {
                categoriesMap.set(category.name, category);
            }
        }
    });

    const uniqueCategories = Array.from(categoriesMap.values());

    res.status(200).json({
        success: true,
        categories: uniqueCategories,
    });
});

exports.getNecessityCategories = catchAsyncErrors(async (req, res, next) => {
    const userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    const necessityCategories = userIncome.categories.filter(
        (category) => category.type === "Necessity"
    );

    // Create a Map to store the highest amount for each category name
    const categoryMap = new Map();

    necessityCategories.forEach((category) => {
        // If category name already exists and current amount is higher, update the map
        if (categoryMap.has(category.name)) {
            const existingCategory = categoryMap.get(category.name);
            if (category.amount > 0 && category.amount > existingCategory.amount) {
                categoryMap.set(category.name, category);
            }
        } else {
            // If category name does not exist in the map, add it
            categoryMap.set(category.name, category);
        }
    });

    // Convert Map values to an array
    const uniqueNecessityCategories = Array.from(categoryMap.values());

    res.status(200).json({
        success: true,
        categories: uniqueNecessityCategories,
    });
});


// Get all categories of Want type for the logged-in user => /api/v1/categories/wants
exports.getWantCategories = catchAsyncErrors(async (req, res, next) => {
    const userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    const necessityCategories = userIncome.categories.filter(
        (category) => category.type === "Want"
    );

    // Create a Map to store the highest amount for each category name
    const categoryMap = new Map();

    necessityCategories.forEach((category) => {
        // If category name already exists and current amount is higher, update the map
        if (categoryMap.has(category.name)) {
            const existingCategory = categoryMap.get(category.name);
            if (category.amount > 0 && category.amount > existingCategory.amount) {
                categoryMap.set(category.name, category);
            }
        } else {
            // If category name does not exist in the map, add it
            categoryMap.set(category.name, category);
        }
    });

    // Convert Map values to an array
    const uniqueWantCategories = Array.from(categoryMap.values());

    res.status(200).json({
        success: true,
        categories: uniqueWantCategories,
    });
});


// Get actual and current saving for the logged-in user => /api/v1/categories/savings
exports.getSavings = catchAsyncErrors(async (req, res, next) => {
    const userIncome = await Income.findOne({user: req.user.id});

    if (!userIncome) {
        return res.status(400).json({
            success: false,
            message: "Income document not found",
        });
    }

    const {savings, currentSavings} = userIncome;

    res.status(200).json({
        success: true,
        savings,
        currentSavings,
    });
});
