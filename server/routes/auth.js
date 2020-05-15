const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');

//PUT auth/signup
router.put('/signup', authController.signUp);
router.get('/getUsers', authController.getUsers);

module.exports = router;