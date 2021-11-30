'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findCarByID } = require('../../repositories/cars-repository');
const { findReviewByCarID } = require('../../repositories/reviews-repository');
const schema = Joi.number().positive().required();

async function getReviewByCarID(req, res) {
  try {
    const { carID } = req.params;
    await schema.validateAsync(carID);
    const car = await findCarByID(carID);
    if (!car) {
      throwJsonError(400, 'This car does not exist');
    }
    const reviews = await findReviewByCarID(carID);
    if (reviews.length === 0) {
      throwJsonError(400, 'There are no reviews for this car.');
    }
    res.status(200).send({ data: reviews });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getReviewByCarID;
