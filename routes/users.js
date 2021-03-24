var express = require('express');
var router = express.Router();
var Notes = require('../db/models/NotesModel');
var {hasAuthorization} = require('../middleware/auth');

/* POT users listing. */
router.post('/',hasAuthorization, async function(req, res, next) {

  try{
    let pending = await Notes.countDocuments({ completed: false }, function (err, pending) {
      if (err){
        throw new Error()
      }
      return pending;
    });
    let completed = await Notes.countDocuments({ completed: true }, function (err, completed) {
      if (err){
        throw new Error()
      }
      return completed;
    });
      let event = await Notes.find().exists('end_date');
      let events = await Notes.countDocuments(event);
    
  let data = await Notes.find().sort({ created: 'desc', titles: 'asc'})
      if(!data){
        res.render('index',{
          messsge: "Nothing at the moment"
        });
      }
      res.render('index', {
        title: 'Schedule App',
        head: 'Dashboard',
        message: "No records",
        data: data,
        pending,
        completed,
        events,
        id: req.user._id

      })
  }catch(e){
    res.status(500).send(e)
  }
});
router.get('/', hasAuthorization, async function(req, res){
  //console.log(req.user._id);
  try{
    let user = req.user;
    let pending = await Notes.countDocuments({ completed: false,id:user._id}, function (err, pending) {
      if (err){
        throw new Error()
      }
      return pending;
    });
    let completed = await Notes.countDocuments({ completed: true,id:user._id}, function (err, completed) {
      if (err){
        throw new Error()
      }
      return completed;
    });
      let event = await Notes.find().exists('end_date');
      let events = await Notes.countDocuments(event);

  let data = await Notes.find().sort({ created: 'desc', titles: 'asc'})
      if(!data){
        res.render('index',{
          messsge: "Nothing at the moment"
        });
      }
      res.render('index', {
        title: 'Schedule App',
        head: 'Dashboard',
        message: "No records",
        data: data,
        pending,
        completed,
        events,
        user: user.email,
        id: user

      })
  }catch(e){
    res.status(401).send("Nothing has been found");
  }
})
router.get('/add-schedule',(req, res)=>{
  res.render('new-schedule',{
  title: 'Add-Schedule',
  head: 'New Schedule'
  });
});
router.post('/add-schedule',hasAuthorization, async function(req, res){

  try{
    const data = new Notes({
      ...req.body,
      id: req.user._id
    });
    await data.save();
    if(!data){
      throw new Error()
    }
    return res.redirect('/users')
  }catch(e){
    res.status(401).send({"Error":"Nothing have been saved"});
  }
});
router.get('/padding-schedules',hasAuthorization, async function (req, res){
  let user = req.user;
  Notes.find({completed: false,id:user._id}).sort({created: 'desc'}).then((data)=>{
    if(!data){
      console.log("No data");
      return res.render('completed-schedules',{
        title: 'Schedule App',
        head: 'Completed Task\'s',
        data: 'No record has been found',
        id: user
      });
    }
    res.render('padding-schedules',{
      title: 'Schedule App',
      head: `Padding Task's`,
      data: data,
      id: user
    })
  }).catch((e)=>{
    res.status(500).send(e)
  })
});
router.get('/completed-schedules',hasAuthorization, async function (req, res){
  let user = req.user;
  Notes.find({completed: true,id:user._id}).sort({ updated: 'desc'}).then((data)=>{
    if(!data){
      res.render('completed-schedules',{
        title: 'Schedule App',
        head: `Finished Task's`,
        nodata: 'No record has been found',
        id: user
      })
    }
    res.render('completed-schedules',{
      title: 'Schedule App',
      head: `Finished Task's`,
      data: data,
      id: user
    })
  }).catch((e)=>{
    res.status(401).send(e)
  })
});
router.get('/complete-schedule/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    await Notes.findOneAndUpdate({_id:id},{completed: true, updated: Date.now()}).then((data)=> {
      if(!data){
        return console.log("Nothing has been found")
      }
      Notes.find({}).sort({updated: 'desc'}).then((task) => {
        if(!task){
          return console.log("No records");
        }
        res.render('index', {
          title: 'Schedule App',
          head: 'Schedules',
          data: task
        })
      });
    })
});
router.get('/delete-schedule/:id',(req, res)=>{
    const id = req.params.id;
    Notes.findByIdAndDelete(id).then((data)=>{
      Notes.find({}).then((task)=>{
        res.render('completed-schedules', {
            title: 'Schedule App',
            head: 'Schedules',
            data: task
          })
      })
    })
});
router.get('/events', async function(req, res){
  try{
    let data = await Notes.find({})

    if(!data){
      return "Nothing has been found"
    }
    res.render('events',{
      title: 'Schedule App',
      head: `Scheduled Event's`,
      data,
      date : Date.now('Y')
    });
  }catch(e){
    res.status(500).send(e)
  }
});
router.get('/inbox', hasAuthorization, async function(req, res,next){
try{
  let user = req.user;
    res.render('mailbox',{
      title: 'Schedule App',
      head: 'Inbox',
      dd: user.name
    });
  }catch(e){
    res.status(401).send(e)
  }
});


module.exports = router;
