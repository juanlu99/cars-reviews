'use strict';

const express = require('express');
const validateUser = require('../controllers/users/activate-user-controller');
const registerUser = require('../controllers/users/register-user-controller');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/activation').get(validateUser);

module.exports = router;

//EndPoints Públicos
//POST api/v1/users/ = registerUser
//POST api/v1/users/login
//GET api/v1/users/activation?code = activar usuario
//EndPoint Privadas
//GET api/v1/users --> solo admin
//GET api/v1/users/:id --> admin y propietario
//PUT api/v1/users/:id
//PUT api/v1/users/:id/avatar
//DELETE api/v1/users/:id --> admin y propietario
