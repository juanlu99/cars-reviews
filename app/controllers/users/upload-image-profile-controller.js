'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const randomstring = require('randomstring');
const path = require('path');
const fs = require('fs');
const { findUserByID, uploadUserImage } = require('../../repositories/users-repository');
const { HTTP_SERVER, PATH_USER_IMAGE } = process.env;

const validExtension = ['.jpeg', '.jpg', '.png'];

async function uploadImageProfile(req, res) {
  try {
    const { id } = req.auth;
    //las imagenes vienen en la cabecera
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'There is no file');
    }
    const { profileImage } = files;
    const { name } = profileImage;
    const extension = path.extname(name);
    if (!validExtension.includes(extension)) {
      throwJsonError(400, 'This format is not valid');
    }
    const user = await findUserByID(id);
    const { image } = user;
    const pathProfileImage = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;
    //borramos el avatar original si existe
    if (image) {
      fs.unlink(`${pathProfileImage}/${image}`, () => {
        console.log('Avatar deleted successfully');
      });
    }
    const randomName = randomstring.generate(10);
    const imgName = `${id}-${randomName}${extension}`;
    const pathImage = `${pathProfileImage}/${imgName}`;
    profileImage.mv(pathImage, async function (err) {
      if (err) throwJsonError(500, err.message);
      await uploadUserImage(id, imgName);
      res.status(200).send({ url: `${HTTP_SERVER}/${PATH_USER_IMAGE}/${imgName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadImageProfile;
