const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
global.containerDependency = require('./containerDependency/Container');

const indexRouter = require('./routes/index');
const housesRouter = require('./routes/houses');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/houses', housesRouter);

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
});

module.exports = app;

// --------------------------------------------------
// const express = require('express');
// global.containerDependency = require('./containerDependency/Container');
// const app = express();

// app.get('/houses', function(req, res, next) {
//   const mongoConnection = containerDependency.get('mongooseDriver');
//   mongoConnection.connect();

//   const houseModel = containerDependency.get('houseModel');
//   houseModel.findById('5e6596179d4a8d63c09aa6ae').then(houseInfo => {
//     res.send(houseInfo);
//     mongoConnection.disconnect();
//   });
// });

// app.listen(3000, () => {
//   console.log("listening")
// });

// module.exports = app;
