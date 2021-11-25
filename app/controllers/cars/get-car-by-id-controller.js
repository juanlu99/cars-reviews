'use strict';

const { findCarByID } = require('../../repositories/cars-repository');

function getCarByID(req, res) {
  const { id } = req.params;
  //si id es un numero
  const car = findCarByID(id);
  if (!car) {
    res.status(400);
    res.send('Error');
  }
  res.status(200);
  res.send({ data: car });
}

module.exports = getCarByID;
