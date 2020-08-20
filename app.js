var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var hbs = require('hbs');
var moment = require('moment'); // require

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./db/DBConnect');
var sassMiddleware = require('node-sass-middleware');
var viewPartials = path.join(__dirname, 'templates/partials');
var viewPath = path.join(__dirname, 'templates/views');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
moment().format();
// view engine setup
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(viewPartials);
hbs.registerHelper("prettifyDate", function(updated) {
  return moment(new Date(updated)).fromNow();
});
hbs.registerHelper("prettifyDate", function(created) {
  return moment(new Date(created)).fromNow();
});

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
  res.render('error');
});

module.exports = app;
