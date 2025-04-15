const express = require("express");
const router = express.Router();
const Message = require("../models/Message.model");

// POST route to create a new message
router.post("/", (req, res, next) => {
  console.log(req.body);

  const { firstName, lastName, email, phoneNumber, message } = req.body;

  if(firstName === "" || lastName === ""  || email  === "" || phoneNumber  === "" || message === "" ){
    res.json({message: "Please fill in the required info before proceeding."});
    return;
  }

  Message.create(req.body)
  .then((message) => {
    res.json({message: "Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.", success: true});
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
