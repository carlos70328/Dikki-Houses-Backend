// General imports
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongoVariables = JSON.parse(process.env.MONGO_VALUES);
const { ContainerBuilder } = require('node-dependency-injection');

// Code imports
const MongooseDriver = require('../database/driver/MongooseDriver');
const HouseSchema = require('../schemas/house/HouseSchema');
const HouseModel = require('../models/house/HouseModel');

// Resources imports
const HOUSE_SCHEMA = require('../schemas/house/houseSchemaDef.json');

// Container Registry
const container = new ContainerBuilder();

container.register('mongooseDriver', MongooseDriver).addArgument(mongoose).addArgument(mongoVariables);
container.register('houseSchema', HouseSchema).addArgument(container.get('mongooseDriver')).addArgument(HOUSE_SCHEMA);
container.register('houseModel', HouseModel).addArgument(container.get('mongooseDriver')).addArgument('houses').addArgument(container.get('houseSchema'));

// Global variables configuration
global.containerDependency = container;

module.exports = container;