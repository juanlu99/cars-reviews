'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findCarByID } = require('../../repositories/cars-repository');
const { addReview } = require('../../repositories/reviews-repository');
const schemaCarId = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  comment: Joi.string().min(20).max(140).required(),
  rating: Joi.number().positive().min(1).max(5).required(),
});

async function createReviewByCarID(req, res) {
  try {
    const { id } = req.auth;
    const { carID } = req.params;
    await schemaCarId.validateAsync(carID);
    const car = findCarByID(carID);
    if (!car) {
      throwJsonError(400, 'This car does not exist.');
    }
    const { body } = req;
    await schemaBody.validateAsync(body);
    const { comment, rating } = body;
    const reviewId = await addReview(id, carID, comment, rating, now);
    res.status(201).send({ reviewId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createReviewByCarID;
