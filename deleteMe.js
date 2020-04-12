global.Helpers = require('./helpers/Helpers');
const driver = require('mongoose');
const HOUSE_SCHEMA = require('./schemas/house/houseSchemaDef.json');

// driver.connect('mongodb://localhost:27017/houses', {useNewUrlParser: true, useUnifiedTopology:true});
driver.connect('mongodb://localhost:27017/houses', null);
var db = driver.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(param) {
    console.log("Connection ok", param);
  // we're connected!
});

var houseSchema = new driver.Schema(HOUSE_SCHEMA);

var model = driver.model('houses', houseSchema);

model.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log("-> ", kittens);
})