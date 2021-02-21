var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var hbs = require('hbs');
var moment = require('moment'); // require

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./db/DBConnect');
require('dotenv').config();
var sassMiddleware = require('node-sass-middleware');
var viewPartials = path.join(__dirname, 'templates/partials');
var viewPath = path.join(__dirname, 'templates/views');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRoute = require('./routes/api/loginApi');
var apiRoutereg = require('./routes/api/registerApi');

var app = express();
moment().format();
//moment.locale();
// view engine setup
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(viewPartials);
hbs.registerHelper("prettifyDate", function(updated) {
  return moment(new Date(updated)).fromNow();
});
hbs.registerHelper("prettifyDate", function(created) {
  let time =  moment(new Date(created)).format('LT');
  let day = moment(new Date(created)).calendar({
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
});
  return time +' '+ day;
});
/*hbs.registerHelper("prettifyDate", function(end_date) {
  let date = moment(new Date(end_date)).format('L');
  let k = moment().format('L');
  if(date >= k){
    return date
  }
/*});*/

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRoute);
app.use('/apireg',apiRoutereg);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    title: 'Schedule App',
    head: '404 Error',
    layout: 'ronewa'
  });
});

module.exports = app;
