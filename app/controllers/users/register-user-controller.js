'use strict';

const createJsonError = require('../../errors/create-json-error');
const { createUser, findUserByEmail } = require('../../repositories/users-repository');
const Joi = require('joi');
const schema = Joi.object().keys({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  verifyPassword: Joi.ref('password'),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await findUserByEmail(email);
    if (user.length !== 0) {
      const error = new Error('This email is already registered');
      error.status = 400; //409 - conflict
      throw error;
    }
    //crear el hash del password
    //crear el verificationCode
    //creat objeto user con los campos
    //llamamos base de datos con createUser
    //mandar email de verificacion
    //res.send()
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
