const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "albe.sclocchi@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD
  },
  debug: true,
});


module.exports = transporter;