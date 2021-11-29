'use strict';

const { createUser, findUserByEmail } = require('../../repositories/users-repository');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const throwJsonError = require('../../errors/throw-json-error');
const createJsonError = require('../../errors/create-json-error');
const { sendMailRegister } = require('../../helpers/mail-smtp');
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
    if (user) {
      throwJsonError(400, 'This user already exists!!');
    }
    //crear el hash del password
    const passwordHash = await bcrypt.hash(password, 12);
    //crear el verificationCode
    const verificationCode = randomstring.generate(64);
    //creat objeto user con los campos
    const userDB = { name, email, passwordHash, verificationCode };
    //llamamos base de datos con createUser
    const userID = await createUser(userDB);
    //mandar email de verificacion
    await sendMailRegister(name, email, verificationCode);
    //res.send()
    res.status(201);
    res.send({ id: userID });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
