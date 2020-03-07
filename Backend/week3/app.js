const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRoutes = require('./routes/dishRoutes');
const promoRoutes = require('./routes/promoRouter');
const leaderRoutes = require('./routes/leaderRoutes');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(
  db => {
    console.log('Connected correctly to server');
  },
  err => console.log(err.toString())
);

const app = express();
app.use(cookieParser('12345-67890-09876-54321'));

function auth(req, res, next) {
  if (!req.signedCookies.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');

    var user = auth[0];
    var pass = auth[1];

    if (user == 'admin' && pass == 'password') {
      res.cookie('user', 'admin', { signed: true });
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  } else {
    if (req.signedCookies.user === 'admin') {
      next();
    } else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Auth
app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRoutes);
app.use('/promotions', promoRoutes);
app.use('/leaders', leaderRoutes);

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
