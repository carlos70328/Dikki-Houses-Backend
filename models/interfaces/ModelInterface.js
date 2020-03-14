class ModelInterface {

    /**
     * Init model definition
     * @param {Driver} driver: 
     * @param {string} modelName 
     * @param {schema} houseSchema 
     */
    constructor(driver, modelName, schema){
        this.driver = driver;
        this.modelName = modelName;
        this.schema = schema;
    }

    /**
     * Search a element in database by id
     * @param {string} id: unique identifier in database
     */
    findById(id) {
        throw new Error("You must Implement findById");
    }


}

module.exports = ModelInterface;