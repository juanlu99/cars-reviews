'uses strict';

const getPool = require('../infrastructure/database');

async function createUser(user) {
  const pool = await getPool();
  const sql = `
  insert into users
  (name, email, password, verificationCode, role, createdAt) 
  values (?, ?, ?, ?, ?, ?)
  `;
  const { name, email, password, verificationCode } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [name, email, password, verificationCode, 'reader', now]);
  console.log('created', created);
  return created.insertId;
}
async function findUserByEmail(email) {
  const pool = await getPool();
  const sql = `
  select id, name, email from users where email = ?
  `;
  const [user] = await pool.query(sql, email);
  return user[0];
}

module.exports = { createUser, findUserByEmail };
