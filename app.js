const express = require('express');
global.containerDependency = require('./containerDependency/Container');
const app = express();

app.get('/houses', function(req, res, next) {
  const mongoConnection = containerDependency.get('mongooseDriver');
  mongoConnection.connect();

  const houseModel = containerDependency.get('houseModel');
  houseModel.findById('5e6596179d4a8d63c09aa6ae').then(houseInfo => {
    res.send(houseInfo);
    mongoConnection.disconnect();
  });
});

app.listen(3000, () => {
  console.log("listening")
});

module.exports = app;
