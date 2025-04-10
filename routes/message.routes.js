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
    res.json({message: message, success: "true"});
  })
  .catch((err)=>{
    res.json({message: err, success: "false"})
  })

});

module.exports = router;
