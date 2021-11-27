'use strict';

function throwJsonError(status, message) {
  const error = new Error(message, status);
  error.status = status;

  throw error;
}

module.exports = throwJsonError;
