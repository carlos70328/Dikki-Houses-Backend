global.Helpers = require('./helpers/Helpers');
const driver = require('mongoose');
const HOUSE_SCHEMA = {
  "description": { "type": "String", "required": true },
  "owner": { "type": "String", "default": "noOwner" },
};

driver.connect('mongodb://localhost:27017/houses', { useNewUrlParser: true, useUnifiedTopology: true });
var db = driver.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection ok");
  // we're connected!
});

var houseSchema = new driver.Schema(HOUSE_SCHEMA);

var houses = driver.model('houses', houseSchema);

var myHouse = new houses({
  "owner": "KDAG-Test001"
});

myHouse.save((err, fluffy) => {
  if (err) return console.error("Kerror ->", err);
  console.log(fluffy);
});

// houses.find(function (err, kittens) {
//     if (err) return console.error(err);
//     console.log("-> ", kittens);
// })