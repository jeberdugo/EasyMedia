var createError = require('http-errors');
const bodyParser = require('body-parser');
const sequelize = require('./db/connection');
const Post = require('./models/Post');
const User = require('./models/User');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');

var app = express();
app.use(bodyParser.json());
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');

    // Sync all models with the database tables
    await sequelize.sync();
    console.log('Models synced.');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();

dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

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
