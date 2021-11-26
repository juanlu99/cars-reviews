'use strict';

const mysql = require('mysql2/promise');

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    });
  }

  return pool;
}

module.exports = getPool;
