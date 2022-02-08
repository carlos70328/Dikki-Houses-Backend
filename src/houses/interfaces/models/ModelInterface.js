const ObjectHelpers = require("../../../helpers/ObjectHelpers");

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
     * Create model definition
     */
    createModel(){
        this._model = this.driver.createModel(this.modelName, this.schema.schema);
    }

    /**
     * Select all model elements in database
     * @param {string} selectValues: string as select fields
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

    find(filter = {}, pagination, selectValues = '') {
        return new Promise((resolve, reject) => {
            try {
                this.driver.findByFilter(this._model, filter, pagination, selectValues, (err, info) => {
                    if(err) {
                        reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                    }
                    else {
                        resolve({ status: constants.httpConst.OK, info: info});
                    }
                });
            } catch (e){
                reject({ status: constants.httpConst.CLIENT_ERROR, error: e.message });
            }
        });
    }

    findWithLimit(location = '', limit = 20, selectValues = '') {
        return new Promise((resolve, reject) => {
            try {
                this.driver.aggregate(this._model, selectValues, location, limit, (err, info) => {
                    if(err) {
                        reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                    }
                    else {
                        resolve({ status: constants.httpConst.OK, info: info});
                    }
                });
            } catch (e){
                console.log(e.message);
            }
        });
    }

    /**
     * Search a element in database by id
     * @param {string} id: unique identifier in database
     * @param {string} selectValues: string as select fields
     */
    findById(id, selectValues = '') {
        const searchById =  { public_id: id };
        return new Promise((resolve, reject) => {
            this.driver.findByFilter(this._model, searchById, selectValues, (err, info) => {
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
     * @param {Object} info: as model in database
     */
    saveInfo(info){
        return new Promise ((resolve, reject) => {
            this.driver.save(this._model, info, (err, info) => {
                if (err) reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                else resolve({ status: constants.httpConst.OK, info: info });
            });
        });
    }

    /**
     * Edit element info (just one)
     * @param {Object} filter : Property to search
     * @param {Object} update : Property to update
     */
    editInfo(filter, update){
        return new Promise((resolve, reject) => {
            this.driver.edit(this._model, filter, update, (err, info) => {
                if (err) reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                else resolve({ status: constants.httpConst.OK, info: info });
            });
        });
    }

    /**
     * Transform response
     * @param {Object} info: Object to transform
     * @param {Object} confidential: data to hide in object
     */
    transformResponse(info, confidential = constants.houseConst.confidentialInfo){
        confidential.map(data => objectHelpers.removePropertyFromObject(info, data));
        return info;
    }

}

module.exports = ModelInterface;
