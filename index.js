var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var usersRouter = require('./routes/index');
var mongoose = require('mongoose')
var app = express();
// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Connected DB
mongoose.connect('mongodb://localhost:27017/dashboard', (err) => {
    if (err) console.log(err);
    else console.log("DB Conected...");
});
app.use(session({
secret: '123456catr',
resave: false,
saveUninitialized: true,
cookie: {
maxAge: 60000
}
}))
app.use(flash());
app.use('/', usersRouter);
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
