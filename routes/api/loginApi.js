var express = require('express');
var Users = require('../../db/models/UsersModel');
var router = express.Router();

router.post('/login', async (req, res, next)=>{

  if(!req.body.password || !req.body.email){
    throw new Error ();
  }
    try{
      let user = await Users.findByCredentials(req.body.email,req.body.password);
      let token = await user.generateAuthToken();
      let tt = await user.getPublicProfile();
      console.log({tt, token});
      res.cookie('t', token, {
        expire: new Date() + 9999
      });
      return res.redirect('/users');
    }catch(e){
      res.status(401).send({error:"Email / Password is empty"});
    }
  });

module.exports = router;