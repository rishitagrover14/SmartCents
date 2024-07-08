// routes/income.js

const express = require("express");
const router = express.Router();

const {
  addCategoryAndDeductAmount,
  addIncome,
  addMultipleCategory,
  getAllCategories,
  getNecessityCategories,
  getWantCategories,
  getSavings,
  getIncome,
} = require("../controllers/incomeControllers");
const { isAuthenticatedUser } = require("../middleware/auth");

// Route to add category and deduct amount
router
  .route("/income/addCategory")
  .post(isAuthenticatedUser, addCategoryAndDeductAmount);

// Route to add income
router.route("/income/add").post(isAuthenticatedUser, addIncome);

router
  .route("/income/addManyCat")
  .post(isAuthenticatedUser, addMultipleCategory);

router.route("/income/get").get(isAuthenticatedUser, getIncome);

router.route("/categories").get(isAuthenticatedUser, getAllCategories);

router.route("/getNecessity").get(isAuthenticatedUser, getNecessityCategories);

router.route("/getWant").get(isAuthenticatedUser, getWantCategories);

router.route("/getSavings").get(isAuthenticatedUser, getSavings);

module.exports = router;
