const SchemaInterface = require('../interfaces/schemas/SchemaInterface');

class HouseSchema extends SchemaInterface {

    /**
     * Init schema definition
     * @param {Driver} driver: Class to create schema definition
     * @param {JSON} houseSchemaDefinition: Definition to create schema in json format
     */
    constructor(driver, houseSchemaDefinition){
        super(driver, houseSchemaDefinition);
    }
    
}

module.exports = HouseSchema;