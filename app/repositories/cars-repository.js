'use strict';

const getPool = require('../infrastructure/database');

async function findAllCars() {
  const pool = await getPool();
  const sql = 'select * from cars';
  const [cars] = await pool.query(sql);
  return cars;
}

async function findCarByID(carID) {
  const pool = await getPool();
  const sql = 'select * from cars where id = ?';
  const [car] = await pool.query(sql, carID);
  return car;
  // const sql2 = 'select * from cars where model = ? and brand = ?';
  // const [car] = await pool.query(sql, [model, brand]);
}

module.exports = { findAllCars, findCarByID };
