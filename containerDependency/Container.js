// General imports
const { ContainerBuilder } = require('node-dependency-injection');
const mongoose = require('mongoose');
const jwksRsa = require("jwks-rsa");
const jwt = require("express-jwt");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

const mongoVariables = JSON.parse(process.env.MONGO_VALUES);
const auth0Variables = JSON.parse(process.env.AUTH_VALUES);
const cloudinaryVariables = JSON.parse(process.env.CLOUDINARY_VALUES);

// Code imports
const httpConstants = require('../src/httpRequest/constants/HttpRequestConstants');
const MongooseDriver = require('../database/driver/MongooseDriver');
const HouseSchema = require('../src/houses/schemas/HouseSchema');
const HouseModel = require('../src/houses/models/HouseModel');

const CloudinaryService = require('../src/images/classes/CloudinaryService');
const Auth0Service = require('../src/middlewares/authorization/auth0/Auth0');

// Resources imports
const HOUSE_SCHEMA = require('../src/houses/schemas/houseSchemaDef.json');

// Container Registry
const container = new ContainerBuilder();

container.register('httpConstants', httpConstants);
container.register('databaseDriver', MongooseDriver).addArgument(mongoose).addArgument(mongoVariables);
container.register('houseSchema', HouseSchema).addArgument(container.get('databaseDriver')).addArgument(HOUSE_SCHEMA);
container.register('houseModel', HouseModel).addArgument(container.get('databaseDriver')).addArgument('houses').addArgument(container.get('houseSchema'));

container.register('imageService', CloudinaryService).addArgument(cloudinary).addArgument(cloudinaryVariables);
container.register('authService', Auth0Service).addArgument(jwt).addArgument(jwksRsa).addArgument(auth0Variables);

// Global variables configuration
global.containerDependency = container;

module.exports = container;