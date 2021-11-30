'use strict';

const getPool = require('../infrastructure/database');

async function addReview(idUser, idCar, coment, rating) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  insert into reviews (idUser, idCar, comment, rating, createdAt)
  values (?, ?, ?, ?, ?)
  `;
  const [review] = await pool.query(sql, [idUser, idCar, coment, rating, now]);

  return review.insertId;
}

async function findReviewByCarID(idCar) {
  const pool = await getPool();
  const sql = 'select * from reviews where idCar = ?';
  const [reviews] = await pool.query(sql, idCar);

  return reviews;
}

module.exports = { addReview, findReviewByCarID };
