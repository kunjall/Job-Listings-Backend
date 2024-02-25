// In your userRoutes.js file
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware')


router.post('/users', authenticateUser, userController.createUser);
router.get('/users/find', authenticateUser, userController.readUsers);
router.patch('/users/:userId/update', authenticateUser, userController.updateUser);
router.delete('/users/delete', authenticateUser, userController.deleteUsers);
router.post('/users/:userId/like', authenticateUser, userController.likeUser);
router.get('/users/ascending-points', authenticateUser, userController.getUsersByPoints);

module.exports = router;
