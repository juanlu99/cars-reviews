'use strict';

const getPool = require('../infrastructure/database');

async function findAllCars() {
  const pool = await getPool();
  const sql = 'select * from cars';
  const [cars] = await pool.query(sql);
  return cars;
}

async function findCarByID(id) {
  const pool = await getPool();
  const sql = 'select * from cars where id = ?';
  const [car] = await pool.query(sql, id);
  return car[0];
  // const sql2 = 'select * from cars where model = ? and brand = ?';
  // const [car] = await pool.query(sql, [model, brand]);
}

async function addImageByCarID(idCar, imageCar) {
  const pool = await getPool();
  const sql = `
  insert into carImages(name, principal, idCar)
  values (?, ?, ?);
  `;
  await pool.query(sql, [imageCar, 0, idCar]);

  return true;
}

async function updateCar(id, car) {
  const { brand, model, year, engine, cv } = car;
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update cars
  set brand = ?, model = ?, year = ?, engine = ?, cv = ?, updatedAt = ?
  where id = ?
`;
  await pool.query(sql, [brand, model, year, engine, cv, now, id]);
  //await pool.query(sql, [
  //...Object.values(car),
  //now,
  //id,
  //])

  return true;
}

module.exports = { findAllCars, findCarByID, addImageByCarID, updateCar };
