'use strict';

const { findCarByID } = require('../../repositories/cars-repository');

function getCarByID(req, res) {
  const { id } = req.params;
  const car = findCarByID(id);
  res.status(200);
  res.send({ data: car });
}

module.exports = getCarByID;
