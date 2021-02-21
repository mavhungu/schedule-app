var express = require('express');
//var usersRouter = require('../users');
var Users = require('../../db/models/UsersModel');
//var registeredUsersRoute = require('./registerApi');
var router = express.Router();

router.post('/login', async (req, res, next)=>{
    try{
      let userData = req.body;
        //let username = userData.name.trim().toLowerCase();
        let email = userData.email.trim().toLowerCase();
        let password = userData.password.trim().toLowerCase();

        if(!password || !email){
          return {
            error: "Email / Password is empty"
          }
        }
        Users.findOne({email:email, password:password})
          .then((data)=>{
            if(!data){
              return res.send("No user has been found")
            }
            console.log("We are in");
            console.log(data);
            console.log(data.email);
            //res.redirect('/users');
          }).catch((e)=>{
            error: "Something went wrong"
          });
          //let registeredUsers = await Users.find().sort({ name: 'asc'})
            //console.log(registeredUsers);
    }catch(error){
      res.status(500).send("error" + error);
    }
  });

module.exports = router;