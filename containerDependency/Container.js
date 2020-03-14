const { ContainerBuilder } = require('node-dependency-injection');
const dotenv = require('dotenv').config();
const mongoVariables = JSON.parse(process.env.MONGO_VALUES);

const MongooseDriver = require('../database/driver/MongooseDriver');
const HouseSchema = require('../schemas/house/HouseSchema');
const HOUSE_SCHEMA = require('../schemas/house/houseSchemaDef.json');
const HouseModel = require('../models/house/HouseModel');

const container = new ContainerBuilder();

container.register('mongooseDriver', MongooseDriver).addArgument(mongoVariables);
const driver = container.get('mongooseDriver');

container.register('houseSchema', HouseSchema).addArgument(driver).addArgument(HOUSE_SCHEMA);
const schema = container.get('houseSchema');

container.register('houseModel', HouseModel).addArgument(driver).addArgument('houses').addArgument(schema.schema);

let a = container.get('houseModel');

a.findById('5e6596179d4a8d63c09aa6ae').then(houseInfo => {
    console.log(houseInfo)
    driver.disconnect();
});