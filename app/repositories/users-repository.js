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
  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await getPool();
  const sql = `
  select id, name, email, password, role, verifiedAt from users where email = ?
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

async function findAllUsers() {
  const pool = await getPool();
  const sql = 'select id, name, email, verifiedAt from users';
  const [users] = await pool.query(sql);
  return users;
}

async function findUserByID(id) {
  const pool = await getPool();
  const sql = 'select name, email, password, image, createdAt, role from users where id = ?';
  const [user] = await pool.query(sql, id);
  return user[0];
}

async function removeUserByID(id) {
  const pool = await getPool();
  const sql = 'delete from users where id = ?';
  await pool.query(sql, id);
  return true;
}

async function uploadUserImage(id, image) {
  const pool = await getPool();
  const sql = `
  update users
  set image = ?
  where id = ?
  `;
  await pool.query(sql, [image, id]);
  return true;
}

async function updateUser(user) {
  const { id, name, email, password } = user;
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update users 
  set name = ?, email = ?, password = ?, updatedAt = ?
  where id = ?
`;
  await pool.query(sql, [name, email, password, now, id]);
  return true;
}

async function updateVerificationCode(id, verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update users
  set verificationCode = ?, updatedAt = ?, verifiedAt = NULL
  where id = ?
  `;
  await pool.query(sql, [verificationCode, now, id]);
  return true;
}

module.exports = { createUser, findUserByEmail, activateUser, getUserByVerificationCode, findAllUsers, findUserByID, removeUserByID, uploadUserImage, updateUser, updateVerificationCode };
