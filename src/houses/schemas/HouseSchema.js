const SchemaInterface = require('../interfaces/schemas/SchemaInterface');

class HouseSchema extends SchemaInterface {

    /**
     * Init schema definition
     * @param {Driver} driver: Class to create schema definition
     * @param {JSON} houseSchemaDefinition: Definition to create schema in json format
     */
    constructor(driver, houseSchemaDefinition, tranformations, indexes){
        super(driver, houseSchemaDefinition, tranformations);
        this._schema = this.driver.createSchema(this.schemaDefinition, this.tranformations);
        this.driver.addIndex(this._schema, indexes);
    }
    
}

module.exports = HouseSchema;