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
        this.createModel();
    }

    /**
     * Create model definition
     */
    createModel(){
        this._model = this.driver.createModel(this.modelName, this.schema);
    }

    /**
     * Get all elements in database
     */
    findAll(selectValues = '') {
        return new Promise((resolve, reject) => {
            this.driver.findAll(this._model, selectValues, (err, info) => {
                if(err) {
                    reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                } 
                else {
                    resolve({ status: constants.httpConst.OK, info: info});
                }
            });
        });
    }

    /**
     * Search a element in database by id
     * @param {string} id: unique identifier in database
     */
    findById(id, selectValues = '') {
        return new Promise((resolve, reject) => {
            this.driver.findById(this._model, id, selectValues, (err, info) => {
                if(err) {
                    reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                }
                else {
                    resolve({ status: constants.httpConst.OK, info: info });
                }
            });
        });
    }

    /**
     * Save info in database
     * @param {JSON} info 
     */
    saveInfo(info){
        return new Promise ((resolve, reject) => {
            this.driver.save(this._model, info, (err, info) => {
                if (err) reject({ status: global.constants.httpConst.CLIENT_ERROR, error: err });
                else resolve({ status: global.constants.httpConst.OK, info: info });
            });
        });
    }

    /**
     * Edit information from element
     * @param {JSON}  
     */
    editInfo(filter, update){
        return new Promise((resolve, reject) => {
            this.driver.edit(this._model, filter, update, (err, info) => {
                if (err) reject({ status: global.constants.httpConst.CLIENT_ERROR, error: err });
                else resolve({ status: global.constants.httpConst.OK, info: info });
            });
        });
    }
}

module.exports = ModelInterface;