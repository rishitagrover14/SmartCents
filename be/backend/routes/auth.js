const express = require('express')
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const {
    registerUser, loginUser, logout, currentUser
} = require('../controllers/authControllers')

router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/currentUser').get(isAuthenticatedUser, currentUser)
router.route('/logout').get(logout)

module.exports = router;
