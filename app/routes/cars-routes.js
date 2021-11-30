'use strict';

const express = require('express');
const router = express.Router();
const getCars = require('../controllers/cars/get-cars-controller');
const getCarByID = require('../controllers/cars/get-car-by-id-controller');
const createReviewByCarID = require('../controllers/cars/create-review-by-car-id-controller');
const validateAuth = require('../middlewares/validate-auth');
const getReviewByCarID = require('../controllers/cars/get-reviews-by-car-id-controller');

//publicos
router.route('/').get(getCars);
router.route('/:id').get(getCarByID);

//privados
router.route('/:carID/reviews').get(getReviewByCarID).all(validateAuth).post(createReviewByCarID);

module.exports = router;
