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
const router = express.Router();

//PUBLICAS
router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);

//PRIVADAS
router.route('/').all(validateAuth).get(getUser);
router.route('/profile').all(validateAuth).get(getUserProfile);
router.route('/:id').all(validateAuth).delete(deleteUserByID);
router.route('/upload').all(validateAuth).post(uploadImageProfile);

module.exports = router;

//EndPoints Públicos
//POST api/v1/users/ = registerUser - DONE
//POST api/v1/users/login - DONE
//GET api/v1/users/activation?code = activar usuario - DONE

//EndPoint Privadas
//GET api/v1/users --> solo admin - DONE
//GET api/v1/users/profile --> propietario - DONE
//PUT api/v1/users/:id
//PUT api/v1/users/:id/avatar
//DELETE api/v1/users/:id --> admin
//POST api/v1/cars/3/reviews
