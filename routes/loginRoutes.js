const express = require('express');
const router = express.Router();
const login = require('../controllers/loginController');
const authenticateUser = require('../middleware/authMiddleware')


router.post('/login', login.loginController); 
router.post('/logout', authenticateUser, login.logoutController )

module.exports = router;
