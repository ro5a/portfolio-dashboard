var createError = require('http-errors');
const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv =require('dotenv');
const bodyparser=("body-parser");
const connectDB= require('./database/connection');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
dotenv.config({path:'config.env'})
var port = process.env.PORT || 8080;
//log request

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);

   connectDB();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use('/',require('./routes/router'));

app.listen(port, function(){
  console.log("server is running on port" + port);
});
module.exports = app;
