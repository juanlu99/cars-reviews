'use strict';

const createJsonError = require('../../errors/create-json-error');
const isAdmin = require('../../helpers/is-admin');
const { findAllUsers } = require('../../repositories/users-repository');

async function getUser(req, res) {
  try {
    isAdmin(req);
    const users = await findAllUsers();
    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUser;
