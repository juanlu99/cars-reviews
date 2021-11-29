'use strict';

const nodemailer = require('nodemailer');
const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailRegister(name, email, code) {
  //generar el link de activacion
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: 'Welcome to CarsReviews App',
    text: `Hi ${name}, to confirm account click here: http://localhost:3000/api/v1/users/activation?code=${code}`,
    html: `Hi ${name}, to confirm account click <a href="http://localhost:3000/api/v1/users/activation?code=${code}">here</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}
async function sendMailCorrectValidation(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: '[CarsReviews] Your account at CarsReviews was activated',
    text: `Hi ${name}, your account was successfully activated at our web.`,
    html: `Hi ${name}, your account was successfully activated at our web.`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = { sendMailRegister, sendMailCorrectValidation };
