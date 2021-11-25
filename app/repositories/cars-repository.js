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

function findCarByID(carID) {
  //const sql = "SELECT * FROM cars WHERE cars.id = carID"
  return cars.find((car) => car.id === +carID);
}
module.exports = { findAllCars, findCarByID };
