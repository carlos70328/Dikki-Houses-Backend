var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // database.
});

router.post('/', function(req, res, next) {
  res.send("Holita post");
});


module.exports = router;
