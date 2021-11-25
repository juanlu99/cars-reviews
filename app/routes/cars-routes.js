'use strict';

const express = require('express');
const getCars = require('../controllers/cars/get-cars-controller');
const getCarByID = require('../controllers/cars/get-car-by-id-controller');
const router = express.Router();

router.route('/').get(getCars);
router.route('/:id').get(getCarByID);

module.exports = router;
