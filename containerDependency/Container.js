// General imports
const { ContainerBuilder } = require('node-dependency-injection');
const mongoose = require('mongoose');
const jwksRsa = require("jwks-rsa");
const jwt = require("express-jwt");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

// --------------------------------------- Resources imports ---------------------------------------
const mongoVariables = JSON.parse(process.env.MONGO_VALUES);
const auth0Variables = JSON.parse(process.env.AUTH_VALUES);
const cloudinaryVariables = JSON.parse(process.env.CLOUDINARY_VALUES);

const constants = require('../src/constants/Constants');
const HOUSE_SCHEMA = require('../src/houses/schemas/houseSchemaDef.json');

// --------------------------------------- Code imports ---------------------------------------
const MongooseDriver = require('../services/drivers/MongooseDriver');
const CloudinaryDriver = require('../services/drivers/CloudinaryDriver');

const HouseSchema = require('../src/houses/schemas/HouseSchema');
const HouseModel = require('../src/houses/models/HouseModel');

const Auth0Service = require('../src/middlewares/authorization/auth0/Auth0');
const ImageService = require('../src/images/classes/ImageManager');

// --------------------------------------- Container Registry ---------------------------------------
const container = new ContainerBuilder();

container.register('databaseDriver', MongooseDriver).addArgument(mongoose).addArgument(mongoVariables);
container.register('cloudinaryDriver', CloudinaryDriver).addArgument(cloudinary).addArgument(cloudinaryVariables);

container.register('houseSchema', HouseSchema).addArgument(container.get('databaseDriver')).addArgument(HOUSE_SCHEMA);
container.register('houseModel', HouseModel).addArgument(container.get('databaseDriver')).addArgument('houses').addArgument(container.get('houseSchema'));

container.register('imageService', ImageService).addArgument(container.get('cloudinaryDriver'));
container.register('authService', Auth0Service).addArgument(jwt).addArgument(jwksRsa).addArgument(auth0Variables);

// Global variables configuration
global.containerDependency = container;

// Constants definition
global.constants = constants

module.exports = container;