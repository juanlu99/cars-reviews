'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { updateUser, findUserByID, findUserByEmail, updateVerificationCode } = require('../../repositories/users-repository');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const { sendMailRegister } = require('../../helpers/mail-smtp');
const schemaBody = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).optional(),
  repeatPassword: Joi.ref('password'),
});

async function updateUserByID(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { name, email, password } = body;
    await schemaBody.validateAsync(body);
    const userLogged = await findUserByID(id);
    const userExists = await findUserByEmail(email);
    if (userExists && userExists !== id) {
      throwJsonError(409, 'This email is already used by another user');
    }
    const updatePassword = await bcrypt.hash(password, 12);
    await updateUser({ id, name, email, password: updatePassword });
    if (email !== userLogged.email) {
      const verificationCode = randomstring.generate(64);
      await updateVerificationCode(id, verificationCode);
      await sendMailRegister(name, email, verificationCode);
    }
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateUserByID;
