const ModelInterface = require('../interfaces/ModelInterface');

class HouseModel extends ModelInterface {

    /**
     * 
     * @param {DatabaseInterface} driver : driver to make actions in database
     * @param {string} modelName : name to representate the object
     * @param {HouseSchema} houseSchema : valid schema for create model
     */
    constructor(driver, modelName, schema){
        super(driver, modelName, schema);
        this._houseModel = this.driver.createModel(this.modelName, this.schema);
    }

    /**
     * find an house by its id
     * @param {string} id : valid identifier
     * @returns {Promise}
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

module.exports = HouseModel;