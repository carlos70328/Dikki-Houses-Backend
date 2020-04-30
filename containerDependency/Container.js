// General imports
const { ContainerBuilder } = require('node-dependency-injection');
const mongoose = require('mongoose');
const jwksRsa = require("jwks-rsa");
const jwt = require("express-jwt");
const dotenv = require('dotenv').config();

const mongoVariables = JSON.parse(process.env.MONGO_VALUES);
const Auth0Variables = JSON.parse(process.env.AUTH_VALUES);

// Code imports
const MongooseDriver = require('../database/driver/MongooseDriver');
const HouseSchema = require('../src/schemas/house/HouseSchema');
const HouseModel = require('../src/models/house/HouseModel');

const Auth0 = require('../src/middlewares/authorization/auth0/Auth0');

// Resources imports
const HOUSE_SCHEMA = require('../src/schemas/house/houseSchemaDef.json');

// Container Registry
const container = new ContainerBuilder();

container.register('mongooseDriver', MongooseDriver).addArgument(mongoose).addArgument(mongoVariables);
container.register('houseSchema', HouseSchema).addArgument(container.get('mongooseDriver')).addArgument(HOUSE_SCHEMA);
container.register('houseModel', HouseModel).addArgument(container.get('mongooseDriver')).addArgument('houses').addArgument(container.get('houseSchema'));
container.register('Auth0', Auth0).addArgument(jwt).addArgument(jwksRsa).addArgument(Auth0Variables);

// Global variables configuration
global.containerDependency = container;

module.exports = container;