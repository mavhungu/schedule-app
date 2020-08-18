var express = require('express');
var router = express.Router();
var config = require('../mavhungu/mavhungu');
var Notes = require('../db/Notes');

/* GET home page. */
router.get('/', function(req, res, next){
  Notes.find({}).then((data)=>{
    //console.log(data);
    if(!data){
      console.log("Nothing at the moment");
    }
    res.render('index', {
      title: 'Schedule App',
      head: 'Schedules',
      message: "No records",
      data: data
    });
  }).catch((e)=>{
    res.status(500).send(e)
  })
});
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
      res.render('new-schedule',{
        title: 'Error',
        head: 'Error'
      })
    }
    res.render('new-schedule',{
      message: "Successfully saved",
      data: data,
      title: 'Add-Schedule',
      head: 'New Schedule',
      tt: 'New data has been added'
    })
  }).catch((e)=>{
    res.status(500).send(e)
  });
});
router.get('/padding-schedules',(req, res)=>{
  Notes.find({completed: false}).then((data)=>{
    if(!data){
      res.render('completed-schedules',{
        title: 'Schedule App',
        head: `Completed Task's`,
        nodata: 'No record has been found'
      })
    }
    res.render('padding-schedules',{
      title: 'Schedule App',
      head: `Padding Task's`,
      data
    })
  }).catch((e)=>{
    res.status(500).send(e)
  })
});
router.get('/completed-schedules',(req, res)=>{
  Notes.find({completed: true}).then((data)=>{
    if(!data){
      res.render('completed-schedules',{
        title: 'Schedule App',
        head: `Completed Task's`,
        nodata: 'No record has been found'
      })
    }
    res.render('completed-schedules',{
      title: 'Schedule App',
      head: `Completed Task's`,
      data: data
    })
  }).catch((e)=>{
    res.status(500).send(e)
  })
});

router.get('/complete-schedule/:id',(req, res)=>{
    const id = req.params.id;
    console.log(id);
    Notes.findOneAndUpdate({_id:id},{completed: true}).then((data)=> {
      if(!data){
        console.log("Nothing has been found")
      }
      Notes.find({}).then((task) => {
        if(!task){
          console.log("No records");
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

module.exports = router;
