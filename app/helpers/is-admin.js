'use strict';

const throwJsonError = require('../errors/throw-json-error');

function isAdmin(req) {
  const { role } = req.auth;
  if (!role || role !== 'admin') {
    throwJsonError(401, 'You are not authorized.');
  }
}

module.exports = isAdmin;
