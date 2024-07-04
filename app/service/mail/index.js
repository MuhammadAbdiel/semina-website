const nodemailer = require('nodemailer');
const Mustache = require('mustache');
const fs = require('fs');
const { gmail, password } = require('../../config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  // port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    const template = fs.readFileSync('app/view/email/otp.html', 'utf8');

    const message = {
      from: gmail,
      to: email,
      subject: 'Otp for registration is: ',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

const invoiceMail = async (email, data) => {
  try {
    const template = fs.readFileSync('app/view/email/invoice.html', 'utf8');

    const message = {
      from: gmail,
      to: email,
      subject: 'Invoice: ',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail, invoiceMail };
