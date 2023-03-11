const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const verifyUser = require('../middleware');

// router.get('/user', User.getAllUsers);
router.post('/user', User.addUser);
router.get('/user', verifyUser, User.getCurrentSessionUserDetails);
router.get('/user/:userId', User.getUserById);

router.post('/login', User.login);

module.exports = router;