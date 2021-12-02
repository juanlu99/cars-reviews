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

async function getAverageRating(idCar) {
  const pool = await getPool();
  const sql = `select avg(rating) as averageRating, 
  count(rating) as numRatings 
  from reviews where idCar = ?`;
  const [avgRating] = await pool.query(sql, idCar);

  return avgRating[0];
}

module.exports = { addReview, findReviewByCarID, getAverageRating };
