'use strict';

const createJsonError = require('../../errors/create-json-error');
const { findUserByID } = require('../../repositories/users-repository');

async function getUserProfile(req, res) {
  try {
    const { id } = req.auth;
    const user = await findUserByID(id);
    const { name, email, image, createdAt } = user;
    //image="abc.png"
    //http://localhost:3000/public/profiles/abc.png
    res.status(200).send({ user });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUserProfile;
