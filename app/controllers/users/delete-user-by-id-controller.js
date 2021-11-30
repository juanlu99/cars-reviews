'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/is-admin');
const { removeUserByID, findUserByID } = require('../../repositories/users-repository');
const schema = Joi.number().positive().required();

async function deleteUserByID(req, res) {
  try {
    isAdmin(req);
    const { id } = req.params;
    await schema.validateAsync(id);
    const user = await findUserByID(id);
    if (!user) {
      throwJsonError(400, 'This user does not exist');
    }
    const { role } = user;
    if (role === 'admin') {
      throwJsonError(403, 'You are not authorized.');
    }
    await removeUserByID(id);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteUserByID;
