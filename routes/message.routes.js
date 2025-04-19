const express = require("express");
const router = express.Router();
const Message = require("../models/Message.model");
const transporter = require("../config/nodemailer")


// POST route to create a new message
router.post("/", (req, res, next) => {
  console.log(req.body);

  const { firstName, lastName, email, phoneNumber, message, countryCode} = req.body;

  if(firstName === "" || lastName === ""  || email  === "" || phoneNumber  === "" || message === "" || countryCode === ""){
    res.json({message: "Please fill in the required info before proceeding."});
    return;
  }

  //re-format phone number
  const updateMessage = {
    firstName,
    lastName,
    email,
    phoneNumber: `+${countryCode.split('_')[1]} ${phoneNumber}`,
    message
  }

  Message.create(updateMessage)
  .then((message) => {
    res.json({message: "Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.", success: true});

    transporter.sendMail({
      from: "albe.sclocchi@gmail.com",
      to: "scloks75tv@gmail.com",
      subject: `${message.firstName} ${message.lastName} is trying to reach out to you!`,
      text: "Thank you!",
      html: `<p>${message.firstName} ${message.lastName} has sent you the following message: </p>
      <hr>
      <p>"${message.message}"<p/>
      <hr>
      <p><b>Email: </b>${message.email}<p/>
      <p><b>Phone Number: </b>${message.phoneNumber}<p/>`
  });

  })
  .catch((err)=>{
    res.json({message: err, success: false})
  })

});


router.get("/", (req, res, next) => {
  
  Message.find()
  .then((messages) => {
    res.json({message: messages, success: true});
  })
  .catch((err)=>{
    res.json({messages: err, success: false})
  })

});

module.exports = router;
