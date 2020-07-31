class SchemaInterface {

    /**
     * Init model definition
     * @param {Driver} driver: 
     * @param {string} modelName 
     * @param {schema} houseSchema 
     */
    constructor(driver, schemaDefinition){
        this.driver = driver;
        this.schemaDefinition = schemaDefinition;
        this._schema = this.driver.createSchema(this.schemaDefinition);
    }

    /**
     * Get method for schema
     */
    get schema(){
        return this._schema;
    }

    /**
     * Add function to the schema 
     * @param {Function} schemaFunction 
     */
    addFunction(schemaFunction) {
        this.driver.addFunctionality(this._schema, schemaFunction);
    }
}

module.exports = SchemaInterface;