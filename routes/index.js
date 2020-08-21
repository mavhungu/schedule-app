var express = require('express');
var router = express.Router();
var config = require('../mavhungu/mavhungu');
var Notes = require('../db/Notes');

/* GET home page. */
router.get('/', function(req, res, next){
  Notes.find({}).sort({ created: 'desc', titles: 'asc'}).then((data)=>{
    //console.log(data);
    if(!data){
      return console.log("Nothing at the moment");
    }
    res.render('index', {
      title: 'Schedule App',
      head: 'Schedules',
      message: "No records",
      data: data
    });
    /*res.json({
        data
    })*/
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
      return res.render('new-schedule',{
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

module.exports = router;
