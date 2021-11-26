'use strict';

const createJsonError = require('../errors/create-json-error');

async function nombreFuncion(req, res) {
  try {
    //validacion parametros entrada
    //llamada base datos
    //validar resultado
    res.send();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = nombreFuncion;
