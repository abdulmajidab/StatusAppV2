const express = require('express');
const router = express.Router();

// User Controller
const { createUser, updateUser, verifyUser,userList,ressendNumber } = require('../Controller/UsersController');

// User Route
router.post('/createUser', createUser);
router.post('/updateUser', updateUser);
router.post('/verifyUser', verifyUser);
router.get('/userList', userList);
router.post('/ressendNumber', ressendNumber);

module.exports = router;

