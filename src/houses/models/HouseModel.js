const ModelInterface = require('../interfaces/models/ModelInterface');

class HouseModel extends ModelInterface {

    /**
     * Define house model
     * @param {DatabaseInterface} driver : driver to make actions in database
     * @param {string} modelName : name to representate the object
     * @param {HouseSchema} houseSchema : valid schema for create model
     */
    constructor(driver, modelName, schema){
        super(driver, modelName, schema);
    }
}

module.exports = HouseModel;