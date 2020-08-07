const SchemaInterface = require('../interfaces/schemas/SchemaInterface');

class HouseSchema extends SchemaInterface {

    /**
     * Init schema definition
     * @param {Driver} driver: Class to create schema definition
     * @param {JSON} houseSchemaDefinition: Definition to create schema in json format
     */
    constructor(driver, houseSchemaDefinition, tranformations){
        super(driver, houseSchemaDefinition, tranformations);
        this._schema = this.driver.createSchema(this.schemaDefinition, this.tranformations);
    }
    
}

module.exports = HouseSchema;