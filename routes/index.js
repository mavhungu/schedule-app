var express = require('express');
var router = express.Router();
var slugify = require('slugify');
//var config = require('../mavhungu/mavhungu');
var Notes = require('../db/models/NotesModel');
var {hasAuthorization,signout} = require('../midleware/auth');

/* GET home page. */
router.get('/', async (req, res, next)=>{
  try{
    res.render("login",{
      title: 'Schedule App',
      head: 'Login',
      layout: 'ronewa'
    })
  }catch(e){
    res.status(500).send(e)
  }
});
router.get('/register', async (req, res, next)=>{
  try{
    res.render("register",{
      title: slugify('Schedule App'),
      head: slugify('Register new Account'),
      layout: 'ronewa'
    })
  }catch(e){
    res.status(500).send(e)
  }
});
router.get('/signout', signout, async (req, res, next)=>{
  try{
    res.render("login",{
      title: 'Schedule App',
      head: 'Login',
      layout: 'ronewa'
    })
  }catch(e){
    res.status(400).send(e)
  }
});

module.exports = router;
