var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const houseModel = containerDependency.get('houseModel');
    houseModel.findAll().then(houseInfo => {
      res.status(200).json(houseInfo);
    });
});

router.get('/id', function(req, res, next) {
  const houseModel = containerDependency.get('houseModel');
  houseModel.findById('5e6596179d4a8d63c09aa6ae').then(houseInfo => {
    res.status(200).json(houseInfo);
  });
});

// router.use(function(req, res, next) {
//   containerDependency.get('mongooseDriver').disconnect();
//   next();
// });


module.exports = router;
