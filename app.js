global.containerDependency = require('./containerDependency/Container');
global.Helpers = require('./helpers/Helpers');

const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/houses/routes/index'); //MOVE IT 
const housesRouter = require('./src/houses/routes/houses');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

containerDependency.get('mongooseDriver').connect();

// ---------------- Routes ----------------
app.use('/', indexRouter);
app.use('/houses', housesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

module.exports = app;