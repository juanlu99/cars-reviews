'use strict';

const express = require('express');
const getCars = require('../controllers/cars/get-cars-controller');
const router = express.Router();

router.route('/').get(getCars);

module.exports = router;
