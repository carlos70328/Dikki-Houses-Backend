const express = require('express');
const cors = require('cors');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const housesRouter = require('./routes/houses');
const app = express();

global.containerDependency = require('./containerDependency/Container');
global.Helpers = require('./helpers/Helpers');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set up Auth0 configuration
const authConfig = {
  "domain": "apparriendos.auth0.com",
  "clientId": "dhXmTUed463UHjuXTIGbhcueTTCT8rCQ",
  "audience": "https://dikki.com/api/v3/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

containerDependency.get('mongooseDriver').connect();

// ---------------- Routes ----------------
app.use('/', indexRouter);
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