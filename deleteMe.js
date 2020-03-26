// const dotenv = require('dotenv').config();
// const container = require('node-dependency-injection');
const driver = require('mongoose');

// const MongooseDriver = require('./database/driver/MongooseDriver');
// const HouseSchema = require('./schemas/house/HouseSchema');
const HOUSE_SCHEMA = require('./schemas/house/houseSchemaDef.json');
const HouseModel = require('./models/house/HouseModel');

const mongoVariables = JSON.parse(process.env.MONGO_VALUES);
const mongoose = new MongooseDriver(driver, mongoVariables);
const houseS = new HouseSchema(mongoose, HOUSE_SCHEMA);
const houseM = new HouseModel(mongoose, 'houses', houseS.schema);

console.log("asd");
houseM.findById('5e6596179d4a8d63c09aa6ae').then(houseInfo => {
    console.log("Eject");
    console.log(houseInfo)
});

// driver.connect('mongodb+srv://adminArriendos:T4BKvl1Q1uUX7cXhT4BKvl1Q1uUX7cXh@cluster0-7oezr.mongodb.net/houses?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true});
// var db = driver.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(param) {
//     console.log("Connection ok", param);
//   // we're connected!
// });

// var houseSchema = new driver.Schema(HOUSE_SCHEMA);

// var model = driver.model('houses', houseSchema);

// var casa = new model();

// casa.save((err, info) => {
//     if (err) return console.error(err);
//     console.log(info);
// });

// model.find(function (err, kittens) {
//     if (err) return console.error(err);
//     console.log("-> ", kittens);
// })