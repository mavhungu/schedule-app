var express = require('express');
var bcrypt = require("bcrypt");
var Users = require('../../db/models/UsersModel');
var router = express.Router();

router.post('/login', async (req, res, next)=>{

  let userData = req.body;
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  
  if(!password || !email){
    throw new Error ("Email / Password is empty")
  }
    try{
      let user = await Users.findOne({email:email})
      if(!user){
        return res.send("Unable to login")
      }
      let userpassword = await bcrypt.compare(password,user.password)
      if(!userpassword){
        return res.send("Password do not match")
      }
      console.log(user)
    }catch(error){
      res.status(400).send(error);
    }
  });

module.exports = router;