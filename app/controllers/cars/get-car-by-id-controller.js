'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findCarByID } = require('../../repositories/cars-repository');

async function getCarByID(req, res) {
  try {
    const { id } = req.params;
    const car = await findCarByID(id);
    if (!car) {
      throwJsonError(400, 'Sorry, we could not find this car!!');
    }
    res.status(200);
    res.send({ data: car });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getCarByID;
