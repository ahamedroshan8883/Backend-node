const express = require('express');
const { signup, signin, EditProfileByEmail } = require('../Controllers/userControllers');
const userRouters = express.Router();

userRouters.post('/signup',signup);
userRouters.post('/signin',signin);
userRouters.post('/EditProfile/:email',EditProfileByEmail);

module.exports =userRouters;