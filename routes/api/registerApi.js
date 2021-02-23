var express = require('express');
var bcrypt = require("bcrypt");
//var usersRouter = require('../users');
var Users = require('../../db/models/UsersModel');
//var registeredUsersRoute = require('./registerApi');
var router = express.Router();


router.post('/registerUser', async (req, res, next)=>{
  
  let userData = req.body;
  let name = userData.name.trim().toLowerCase();
  let email = userData.email.trim().toLowerCase();
  let password1 = userData.password1.trim().toLowerCase();
  let password2 = userData.password2.trim().toLowerCase();
  let password = await bcrypt.hash(password1,8);

  if(!name || !password1 || !email){
    return res.send("Username / Email / Password is empty")
  }
    let users = new Users({name, email, password})  
  try{
    await users.save()
    console.log("information have been saved")
    res.redirect('/');

    }catch(e){
      res.status(500).send("Error"+ e)
    }
  })

module.exports = router;