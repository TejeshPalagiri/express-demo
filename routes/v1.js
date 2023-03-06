const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/user', User.getAllUsers);
router.post('/user', User.addUser);
router.get('/user/:userId', User.getUserById);

module.exports = router;