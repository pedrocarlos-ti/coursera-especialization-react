const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const authenticate = require('./authenticate');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRoutes = require('./routes/dishRoutes');
const promoRoutes = require('./routes/promoRouter');
const leaderRoutes = require('./routes/leaderRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

var config = require('./config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter
});

const mongoose = require('mongoose');

const connect = mongoose.connect(config.mongoUrl, {
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
app.use(express.json());

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRoutes);
app.use('/promotions', promoRoutes);
app.use('/leaders', leaderRoutes);
app.use('/favorites', favoriteRoutes);

app.post('/files', upload.single('imagem'), (req, res, next) => {
  res.json(req.file);
});

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
