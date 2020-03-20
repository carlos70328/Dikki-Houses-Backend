const DatabaseInterface = require('../interfaces/DatabaseInterface');

class Mongoose extends DatabaseInterface {

    /**
     * @param {Object} params
     */
    constructor(driver, params){
        super();
        this._mongoDriver = driver;
        this.params = params;
        // this.connect(params);
    }

    /**
     * create mongodb connection
     * @param {Object} connectionInfo : contains protocol, user, password, host, params and options 
     */
    connect(){
        const { protocol, user, password, host, params, options } = this.params;
        this._mongoConnetion = this._mongoDriver.connect(`${protocol}://${user}:${password}@${host}?${params}`, options);
    }

    /**
     * close mongodb connection
     * @param {Object} connectionInfo : contains protocol, user, password, host, params and options 
     */
    disconnect(){
        this._mongoDriver.connection.close()
    }

    /**
     * Get method for mongoConnection
     */
    get mongoConnetion() {
        return this._mongoConnetion;
    }

    /**
     * create a schema with a json definition
     * @param {JSON} schemaDefinition: Json definition for schema
     */
    createSchema(schemaDefinition){
        return new this._mongoDriver.Schema(schemaDefinition);
    }

    /**
     * Create a model with a schema and a name
     * @param {string} modelName : name for model (as collection name)
     * @param {SchemaInterface} schema : for create the model
     */
    createModel(modelName, schema){
        return this._mongoDriver.model(modelName, schema);
    }

    /**
     * Search an element in database by id
     * @param {string} id : identifier for object
     * @param {ModelInterface} model : Model base for search
     * @param {Function} callback : when finish
     */
    findById(id, model, callback){
        model.findById(id, callback);
    }

    /**
     * Add function to schema execution
     * @param {SchemaInterface} schema : base schema for add functions
     * @param {Function} schemaFuntion : function to add
     */
    addFunctionality(schema, schemaFuntion){
        let functionName = schemaFuntion.name || "NO_NAMED_FUNCTION";
        schema.methods[functionName] = schemaFuntion
    }
}

module.exports = Mongoose;