const dotenv = require('dotenv').config();
const container = require('node-dependency-injection');


const MongooseDriver = require('./database/driver/MongooseDriver');
const HouseSchema = require('./schemas/house/HouseSchema');
const HOUSE_SCHEMA = require('./schemas/house/houseSchemaDef.json');
const HouseModel = require('./models/house/HouseModel');

const mongoVariables = JSON.parse(process.env.MONGO_VALUES);
const mongoose = new MongooseDriver(mongoVariables);
const houseS = new HouseSchema(mongoose, HOUSE_SCHEMA);
const houseM = new HouseModel(mongoose, 'houses', houseS.schema);

houseM.findById('5e6596179d4a8d63c09aa6ae').then(houseInfo => console.log(houseInfo));