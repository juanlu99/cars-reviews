'use strict';

const express = require('express');
const validateUser = require('../controllers/users/activate-user-controller');
const getUser = require('../controllers/users/get-users-controller');
const loginUser = require('../controllers/users/login-user-controller');
const registerUser = require('../controllers/users/register-user-controller');
const getUserProfile = require('../controllers/users/get-user-profile-controller');
const validateAuth = require('../middlewares/validate-auth');
const deleteUserByID = require('../controllers/users/delete-user-by-id-controller');
const uploadImageProfile = require('../controllers/users/upload-image-profile-controller');
const updateUserByID = require('../controllers/users/update-user-controller');
const router = express.Router();

//PUBLICAS
router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);

//PRIVADAS
router.route('/').all(validateAuth).get(getUser);
router.route('/profile').all(validateAuth).get(getUserProfile).put(updateUserByID);
router.route('/:id').all(validateAuth).delete(deleteUserByID);
router.route('/upload').all(validateAuth).post(uploadImageProfile);

module.exports = router;
