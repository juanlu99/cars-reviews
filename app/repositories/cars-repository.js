'use strict';

const cars = [
  {
    id: 1,
    brand: 'Seat',
    model: 'Ibiza',
    year: 2019,
    engine: 'Diesel',
    cv: 60,
  },
  {
    id: 2,
    brand: 'Seat',
    model: 'Toledo',
    year: 1999,
    engine: 'Gasolina',
    cv: 120,
  },
];

function findAllCars() {
  //const sql = "SELECT * FROM cars";
  return cars;
}

module.exports = { findAllCars };
