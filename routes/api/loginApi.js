var express = require('express');
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Users = require('../../db/models/UsersModel');
var router = express.Router();

router.post('/login', async (req, res, next)=>{

  let userData = req.body;
  let email = userData.email.trim().toLowerCase();
  let password = userData.password.trim().toLowerCase();
  
  let token = jwt.sign({_id:'abc123'},'thisismynewcourse')
  console.log(token);
  let data = jwt.verify(token,'thisismynewcourse')
  console.log(data)
  
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