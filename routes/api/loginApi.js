var express = require('express');
var bcrypt = require("bcrypt");
var Users = require('../../db/models/UsersModel');
var router = express.Router();

router.post('/login', async (req, res, next)=>{

  let userData = req.body;
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  
  if(!password || !email){
    return {
      error: "Email / Password is empty"
    }
  }
    try{
      let user = await Users.findOne({email:email})
      let userpassword = await bcrypt.compare(password,user.password)
      console.log(userpassword)
    }catch(error){
      res.status(500).send(error);
    }
  });

module.exports = router;