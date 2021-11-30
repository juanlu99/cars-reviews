'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findUserByEmail } = require('../../repositories/users-repository');
const schema = Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

async function loginUser(req, res) {
  try {
    const { body } = req;
    //validamos body
    await schema.validateAsync(body);
    const { username, password } = body;
    //obtenemos usuario con ese email desde el repository
    const user = await findUserByEmail(username);
    //validamos que el user existe
    if (!user) {
      throwJsonError(403, 'This email or-and password does not belong to an existing user.');
    }
    const { id, name, password: passwordHash, role, verifiedAt } = user;
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    if (!isValidPassword) {
      throwJsonError(403, 'This email or-and password does not belong to an existing user.');
    }
    if (!verifiedAt) {
      throwJsonError(401, 'This account is not verified yet. Check your email for the activation link.');
    }
    const tokenPayload = { id, name, role };
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '20m' });
    const response = {
      accessToken: token,
      expiresIn: '20m',
    };
    res.status(200);
    res.send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
