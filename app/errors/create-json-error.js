'use strict';

function createJsonError(error, res) {
  const { status, message } = error;
  res.status(status || 400);
  res.send({
    error: message,
  });
}

module.exports = createJsonError;
