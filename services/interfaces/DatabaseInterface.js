class DatabaseInterface {

    constructor(driver, params){
        this.driver = driver;
        this.params = params;
    }
    
    /**
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     */
    connect(schemaDefinition){
        throw new Error("You must Implement connect");
    }

    /**
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     */
    disconnect(schemaDefinition){
        throw new Error("You must Implement disconnect");
    }

    /**
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     * @param {SchemaInterface} schemaDefinition 
     */
    createSchema(schemaDefinition){
        throw new Error("You must Implement createSchema");
    }

    /**
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     * @param {strinc} modelName 
     * @param {SchemaInterface} schema 
     */
    createModel(modelName, schema){
        throw new Error("You must Implement createModel");
    }

    /**
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     */
    findById(){
        throw new Error("You must Implement findById");
    }

    /**
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     * @param {SchemaInterface} schema
     * @param {Function} schemaFuntion
     */
    addFunctionality(schema, schemaFuntion){
        throw new Error("You must Implement addFunctionality");
    }
}

module.exports = DatabaseInterface;