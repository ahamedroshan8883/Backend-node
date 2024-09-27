const express = require('express');
const { signup, signin, EditProfileByEmail, getProfileByEmail } = require('../Controllers/userControllers');
const userRouters = express.Router();

userRouters.post('/signup',signup);
userRouters.post('/signin',signin);
userRouters.post('/EditProfile/:email',EditProfileByEmail);
userRouters.get('getProfile/:email',getProfileByEmail);

module.exports =userRouters;