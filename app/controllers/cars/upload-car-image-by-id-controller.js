'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/is-admin');
const { findCarByID, addImageByCarID } = require('../../repositories/cars-repository');
const uploadImage = require('../../helpers/upload-image');
const path = require('path');
const schema = Joi.number().positive().integer().required();
const { PATH_CARS_IMAGE } = process.env;

const validExtension = ['.jpeg', '.jpg', '.png'];

async function uploadCarImage(req, res) {
  try {
    isAdmin(req);
    const { carID } = req.params;
    await schema.validateAsync(carID);
    const car = await findCarByID(carID);
    if (!car) {
      throwJsonError(400, 'This car does not exist');
    }
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'There is no file');
    }
    const { imageCar } = files;
    if (!imageCar) {
      throwJsonError(400, 'This file is not accepted');
    }
    const { name, data } = imageCar;
    const extension = path.extname(name);
    if (!validExtension.includes(extension)) {
      throwJsonError(400, 'This format is not valid');
    }
    const carImage = await uploadImage({
      imageData: data,
      destination: `${PATH_CARS_IMAGE}/${carID}`,
      width: 300,
      height: 300,
      codImage: carID,
    });
    await addImageByCarID(carID, carImage);
    res.status(201).send('Image uploaded successfully');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadCarImage;
