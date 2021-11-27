'uses strict';

const getPool = require('../infrastructure/database');

async function createUser(user) {
  const pool = await getPool();
  const sql = `
  insert into users
  (name, email, password, verificationCode, role, createdAt) 
  values (?, ?, ?, ?, ?, ?)
  `;
  const { name, email, passwordHash, verificationCode } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [name, email, passwordHash, verificationCode, 'reader', now]);
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
async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update users
  set verifiedAt = ?
  where verificationCode = ?
  and verifiedAt is null
  `;
  const [result] = await pool.query(sql, [now, verificationCode]);
  return result.affectedRows === 1;
}
async function getUserByVerificationCode(verificationCode) {
  const pool = await getPool();
  const sql = `
  select * from users where verificationCode = ?
  `;
  const [user] = await pool.query(sql, verificationCode);
  return user[0];
}

module.exports = { createUser, findUserByEmail, activateUser, getUserByVerificationCode };
