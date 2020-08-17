const DatabaseInterface = require('../interfaces/DatabaseInterface');

class Mongoose extends DatabaseInterface {

    /**
     * @param {Object} params
     */
    constructor(driver, params){
        super(driver, params);
        this.updateOptions = { new: true };
    }

    /**
     * create mongodb connection
     * @param {Object} connectionInfo : contains protocol, user, password, host, params and options 
     */
    connect(){
        const connectionString = this.makeConnectionString(this.params);
        const { options } = this.params;
        this._mongoConnetion = this.driver.connect(connectionString, options);
    }

    /**
     * Create string to connect to database
     * @param {*} param 
     */
    makeConnectionString({ protocol, user, password, host, database, params }){
        if(Helpers.isSet(protocol) && Helpers.isSet(host) && Helpers.isSet(database)){
            let connectStr = `${protocol}://[credentials]${host}/${database}[params]`;

            Helpers.isSet(user) && Helpers.isSet(password) ? 
                connectStr = connectStr.replace('[credentials]', `${user}:${password}@`) : 
                connectStr = connectStr.replace('[credentials]', '');

            Helpers.isSet(params) ? 
                connectStr = connectStr.replace('[params]', `?${params}`) : 
                connectStr = connectStr.replace('[params]', '');

            return connectStr;
        } else {
            throw new Exception('Missing info to connect to database');
        }
    }

    /**
     * close mongodb connection
     * @param {Object} connectionInfo : contains protocol, user, password, host, params and options 
     */
    disconnect(){
        this.driver.connection.close()
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
        return new this.driver.Schema(schemaDefinition);
    }

    /**
     * Create a model with a schema and a name
     * @param {string} modelName : name for model (as collection name)
     * @param {SchemaInterface} schema : for create the model
     */
    createModel(modelName, schema){
        return this.driver.model(modelName, schema);
    }

    /**
     * Get all elements in database
     * @param {ModelInterface} model : Model base for search
     * @param {Function} callback : when finish
     */
    findAll(model, selectData, callback){
        model.find({}).select(selectData).exec(callback);
    }

    /**
     * Search an element in database by id
     * @param {ModelInterface} model : Model base for search
     * @param {string} id : identifier for object
     * @param {Function} callback : when finish
     */
    findById(model, id, selectData, callback){
        model.find({ 'public_id': id }).select(selectData).exec(callback);
    }
    
    /**
     * Save info on database
     * @param {ModelInterface} model 
     * @param {JSON} info 
     * @param {Function} callback 
     */
    save(model, info, callback){
        new model(info).save(callback);
    }

    /**
     * Edit information on database with filter
     * @param {ModelInterface} model 
     * @param {JSON} filter 
     * @param {Function} callback 
     */
    edit(model, filter, update, callback){
        model.findOneAndUpdate(filter, update, this.options, callback);
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