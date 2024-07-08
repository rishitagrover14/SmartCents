const express = require('express');
const router = express.Router();
const { investPoints } = require('../controllers/investControllers');
const { isAuthenticatedUser } = require("../middleware/auth");

router.post('/invest', isAuthenticatedUser, investPoints);

module.exports = router;
