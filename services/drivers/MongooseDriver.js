const DatabaseInterface = require("../interfaces/DatabaseInterface");

class Mongoose extends DatabaseInterface {
   /**
    * @param {Object} params
    */
   constructor(driver, params) {
      super(driver, params);
      this.updateOptions = { new: true };
   }

   /**
    * create mongodb connection
    * @param {Object} connectionInfo : contains protocol, user, password, host, params and options
    */
   connect() {
      const connectionString = this.makeConnectionString(this.params);
      const { options } = this.params;
      this._mongoConnetion = this.driver.connect(connectionString, options);
   }

   /**
    * Create string to connect to database
    * @param {*} connectionInfo : contains protocol, user, password, host and params
    */
   makeConnectionString({ protocol, user, password, host, database, params }) {
      if (
         Helpers.isSet(protocol) &&
         Helpers.isSet(host) &&
         Helpers.isSet(database)
      ) {
         let connectStr = `${protocol}://[credentials]${host}/${database}[params]`;

         Helpers.isSet(user) && Helpers.isSet(password)
            ? (connectStr = connectStr.replace(
                 "[credentials]",
                 `${user}:${password}@`
              ))
            : (connectStr = connectStr.replace("[credentials]", ""));

         Helpers.isSet(params)
            ? (connectStr = connectStr.replace("[params]", `?${params}`))
            : (connectStr = connectStr.replace("[params]", ""));

         return connectStr;
      } else {
         throw new Exception("Missing info to connect to database");
      }
   }

   /**
    * close mongodb connection
    * @param {Object} connectionInfo : contains protocol, user, password, host, params and options
    */
   disconnect() {
      this.driver.connection.close();
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
    * @param {Object} Transformations: Json transformations (see mongoose documentation)
    */
   createSchema(schemaDefinition, tranformations) {
      return new this.driver.Schema(schemaDefinition, tranformations);
   }

   /**
    *
    * @param {Schema} schema
    * @param {Object} indexObject
    */
   addIndex(schema, indexObject) {
      schema.index(indexObject);
   }

   /**
    * Create a model with a schema and a name
    * @param {string} modelName : name for model (as collection name)
    * @param {SchemaInterface} schema : for create the model
    */
   createModel(modelName, schema) {
      return this.driver.model(modelName, schema);
   }

   /**
    * Get all elements in database
    * @param {ModelInterface} model : Model base for search
    * @param {string} model : data selector
    * @param {Function} callback : when finish
    */
   findAll(model, selectData, callback) {
      model.find().select(selectData).exec(callback);
   }

   aggregate(model, selectData, location, limit = 50, callback) {
      let filter = [{ $sample: { size: limit } }];
      filter.push({ $unset: ["_id", "statusProcess"] });
      if (location) filter.push({ $match: { "location.city": location } });
      model.aggregate(filter).exec(callback);
   }

   /**
    * Search an element in database by id
    * @param {ModelInterface} model : Model base for search
    * @param {Object} filter : object for searching
    * @param {string} model : data selector
    * @param {Function} callback : when finish
    */
   findByFilter(model, filter, pagination, selectData, callback) {
      model.find(filter, selectData, pagination).exec(callback);
   }

   /**
    * Save info on database
    * @param {ModelInterface} model : Model base for save
    * @param {Object} info : Info as Json object to save
    * @param {Function} callback
    */
   save(model, info, callback) {
      new model(info).save(callback);
   }

   /**
    * Edit information on database with filter
    * @param {ModelInterface} model : Model base for edit
    * @param {Object} filter : Search property object (use id)
    * @param {Object} update : Property to change
    * @param {Function} callback
    */
   edit(model, filter, update, callback) {
      model.findOneAndUpdate(filter, update, this.options, callback);
   }

   /**
    * Add function to schema execution
    * @param {SchemaInterface} schema : base schema for add functions
    * @param {string} schemaFnName : name for function in schemas
    * @param {Function} schemaFuntion : function to add
    */
   addFunctionality(schema, schemaFnName, schemaFuntion) {
      let functionName = schemaFnName || "NO_NAMED_FUNCTION";
      schema.methods[functionName] = schemaFuntion;
   }

   convertPositon(converGeoPosition) {
      if (
         converGeoPosition.coordinates[0] !== undefined &&
         converGeoPosition.coordinates[1] !== undefined
      ) {
         return {
            type: "Point",
            coordinates: [
               converGeoPosition.coordinates[0],
               converGeoPosition.coordinates[1],
            ],
         };
      } else {
         throw new Error("Invalid coordinates format");
      }
   }
}

module.exports = Mongoose;
