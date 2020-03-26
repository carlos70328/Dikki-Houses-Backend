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
        this.schema = schema.schema;
    }

    /**
     * Get all elements in database
     */
    findAll() {
        return new Promise((resolve, reject) => {
                this.driver.findAll(this._houseModel, (err, houseInfo) => {
                if(err) reject(err);
                else resolve(houseInfo);
            });
        });
    }

    /**
     * Search a element in database by id
     * @param {string} id: unique identifier in database
     */
    findById(id) {
        return new Promise((resolve, reject) => {
                this.driver.findById(id, this._houseModel, (err, houseInfo) => {
                if(err) reject(err);
                else resolve(houseInfo);
            });
        });
    }
}

module.exports = ModelInterface;