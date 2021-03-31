const express = require('express');
const router = express.Router();

// User Controller
const { createUser,updateUser } = require('./../Controller/UsersController');

// User Route
router.post('/', createUser);
router.post('/:id', updateUser);

module.exports = router;

