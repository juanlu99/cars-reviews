'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findCarByID } = require('../../repositories/cars-repository');
const { getAverageRating } = require('../../repositories/reviews-repository');
const schema = Joi.number().positive().integer().required();

async function getRating(req, res) {
  try {
    const { carID } = req.params;
    await schema.validateAsync(carID);
    const car = await findCarByID(carID);
    if (!car) {
      throwJsonError(400, 'This car does not exist');
    }
    const ratingInfo = await getAverageRating(carID);
    const { numRatings } = ratingInfo;
    if (numRatings === 0) {
      throwJsonError(400, 'This car does not have ratings');
    }
    res.status(200).send(ratingInfo);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getRating;
