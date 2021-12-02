'use strict';

const express = require('express');
const router = express.Router();
const getCars = require('../controllers/cars/get-cars-controller');
const getCarByID = require('../controllers/cars/get-car-by-id-controller');
const createReviewByCarID = require('../controllers/cars/create-review-by-car-id-controller');
const validateAuth = require('../middlewares/validate-auth');
const getReviewByCarID = require('../controllers/cars/get-reviews-by-car-id-controller');
const getRating = require('../controllers/cars/get-average-rating-by-car-id-controller');
const uploadCarImage = require('../controllers/cars/upload-car-image-by-id-controller');
const updateCarInfo = require('../controllers/cars/update-car-by-id-controller');

//publicos
router.route('/').get(getCars);
router.route('/:id').get(getCarByID);
router.route('/:carID/rating').get(getRating);

//privados
router.route('/:carID/reviews').get(getReviewByCarID).all(validateAuth).post(createReviewByCarID);
router.route('/:carID/upload').all(validateAuth).post(uploadCarImage);
router.route('/:carID').all(validateAuth).put(updateCarInfo);

module.exports = router;
