var express = require('express');
var router = express.Router();
var Notes = require('../db/models/NotesModel');
var {hasAuthorization} = require('../middleware/auth');

/* POT users listing. */
router.post('/', async function(req, res, next) {

  try{
    let pending = await Notes.countDocuments({ completed: false }, function (err, pending) {
      if (err){
        console.log("Mavhungu ")
      }
      return pending;
    });
    let completed = await Notes.countDocuments({ completed: true }, function (err, completed) {
      if (err){
        console.log("Mavhungu ")
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
        events
      })
  }catch(e){
    res.status(500).send(e)
  }
});
router.get('/', hasAuthorization, async function(req, res){
  try{
    let user = req.user;
    //console.log(user);
    let pending = await Notes.countDocuments({ completed: false }, function (err, pending) {
      if (err){
        console.log("Mavhungu ")
      }
      return pending;
    });
    let completed = await Notes.countDocuments({ completed: true }, function (err, completed) {
      if (err){
        console.log("Mavhungu ")
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
        user: req.user.name
      })
  }catch(e){
    res.status(401).send(e)
  }
})
router.get('/add-schedule',(req, res)=>{
  res.render('new-schedule',{
  title: 'Add-Schedule',
  head: 'New Schedule'
  });
});
router.post('/add-schedule',(req, res)=>{
  const data = new Notes(req.body);
  console.log(req.body);
  data.save().then((data)=>{
    if(!data){
      return res.render('new-schedule',{
        title: 'Error',
        head: 'Error'
      })
    }
      res.redirect(303,'/users')
  }).catch((e)=>{
    res.status(500).send(e)
  });
});
router.get('/padding-schedules',(req, res)=>{
  Notes.find({completed: false}).sort({created: 'desc'}).then((data)=>{
    if(!data){
      console.log("No data");
      return res.render('completed-schedules',{
        title: 'Schedule App',
        head: 'Completed Task\'s',
        data: 'No record has been found'
      });
    }
    res.render('padding-schedules',{
      title: 'Schedule App',
      head: `Padding Task's`,
      data: data
    })
  }).catch((e)=>{
    res.status(500).send(e)
  })
});
router.get('/completed-schedules',(req, res)=>{
  Notes.find({completed: true}).sort({ updated: 'desc'}).then((data)=>{
    if(!data){
      res.render('completed-schedules',{
        title: 'Schedule App',
        head: `Finished Task's`,
        nodata: 'No record has been found'
      })
    }
    res.render('completed-schedules',{
      title: 'Schedule App',
      head: `Finished Task's`,
      data: data
    })
  }).catch((e)=>{
    res.status(500).send(e)
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
        })/*.catch((e) => {
          res.status(500).send(e)
        })*/
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
    console.log(data);

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

module.exports = router;
