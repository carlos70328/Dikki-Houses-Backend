const SchemaInterface = require('../interfaces/SchemaInterface');

class HouseSchema extends SchemaInterface {

    /**
     * Init schema definition
     * @param {Driver} driver: Class to create schema definition
     * @param {JSON} houseSchemaDefinition: Definition to create schema in json format
     */
    constructor(driver, houseSchemaDefinition){
        super(driver, houseSchemaDefinition);
    }
    
    /**
     * Add function to the schema 
     * @param {Function} schemaFunction 
     */
    addFunction(schemaFunction) {
        this.driver.addFunctionality(this._houseSchema, schemaFunction);
    }
}

module.exports = HouseSchema;