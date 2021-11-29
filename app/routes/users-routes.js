'use strict';

const express = require('express');
const validateUser = require('../controllers/users/activate-user-controller');
const getUser = require('../controllers/users/get-users-controller');
const loginUser = require('../controllers/users/login-user-controller');
const registerUser = require('../controllers/users/register-user-controller');
const validateAuth = require('../middlewares/validate-auth');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/activation').get(validateUser);
router.route('/login').post(loginUser);

router.route('/').all(validateAuth).get(getUser);

module.exports = router;

//EndPoints Públicos
//POST api/v1/users/ = registerUser - DONE
//POST api/v1/users/login - DONE
//GET api/v1/users/activation?code = activar usuario - DONE

//EndPoint Privadas
//GET api/v1/users --> solo admin - DONE
//GET api/v1/users/:id --> admin y propietario
//PUT api/v1/users/:id
//PUT api/v1/users/:id/avatar
//DELETE api/v1/users/:id --> admin y propietario
