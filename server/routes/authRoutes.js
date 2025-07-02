const express = require('express');
const router = express.Router();
const { signupUser, loginUser, forgotPassword } = require('../controllers/authController');

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
