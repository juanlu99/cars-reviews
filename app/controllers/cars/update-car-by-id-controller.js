'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/is-admin');
const { updateCar, findCarByID } = require('../../repositories/cars-repository');
const schemaID = Joi.number().positive().integer().required();
const schemaBody = Joi.object().keys({
  brand: Joi.string().min(3).max(20).required(),
  model: Joi.string().min(2).max(50).required(),
  year: Joi.number().positive().integer().min(1950).max(new Date().getFullYear()).required(),
  engine: Joi.string().valid('Diesel', 'Gasolina', 'Híbrido', 'Eléctrico'),
  cv: Joi.number().integer().positive().required(),
});

async function updateCarInfo(req, res) {
  try {
    isAdmin(req);
    const { carID } = req.params;
    await schemaID.validateAsync(carID);
    const car = findCarByID(carID);
    if (!car) {
      throwJsonError(400, 'This car does not exist');
    }
    const { body } = req;
    await schemaBody.validateAsync(body);
    await updateCar(carID, body);
    res.status(200).send(`Car ${carID} info updated successfully`);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateCarInfo;
