var express = require('express');
//var usersRouter = require('../users');
var Users = require('../../db/models/UsersModel');
//var registeredUsersRoute = require('./registerApi');
var router = express.Router();


router.post('/registerUser', async (req, res, next)=>{
    try{
      let userData = req.body;
        let name = userData.name.trim().toLowerCase();
        let email = userData.email.trim().toLowerCase();
        let password1 = userData.password1.trim().toLowerCase();
        let password2 = userData.password2.trim().toLowerCase();
        let password = password1;

        if(!name || !password1 || !email){
          return "Username / Email / Password is empty";
        }

          let users = new Users({name, email, password})
          users.save().then(()=>{
            console.log("information have been saved")
            res.redirect('/');
          }).catch((e)=>{
            return {error: "Something went wrong"+ e };
          });
          /*let registeredUsers = await Users.find().sort({ name: 'asc'})
            console.log(registeredUsers);*/
    }catch(e){
      res.status(500).send("Error"+ e)
    }
  })

module.exports = router;