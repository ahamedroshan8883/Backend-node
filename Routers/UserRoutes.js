const express = require('express');
const { signup, signin } = require('../Controllers/userControllers');
const userRouters = express.Router();

userRouters.post('/signup',signup);
userRouters.post('/signin',signin);

module.exports =userRouters;