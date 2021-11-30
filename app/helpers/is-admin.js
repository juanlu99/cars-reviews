'use strict';

const throwJsonError = require('../errors/throw-json-error');

function isAdmin(req) {
  const { role } = req.auth;
  if (!role || role !== 'admin') {
    throwJsonError(403, 'You are not authorized.');
  }

  return true;
}

module.exports = isAdmin;
