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
        this.createModel();
    }

    /**
     * Save info in database
     * @param {Object} info : If it has geoposition  convert to db format
     */
    saveInfo(info){
        if(info.geoPosition){
            info.geoPosition = this.driver.convertPositon(info.geoPosition);
        }
        return super.saveInfo(info);
    }

    /**
     * Search houses from X,Y point in a Radius
     * @param {Array<number>} coordinates: First position [0] is X or Latitude; Second position [1] is Y or Longitude
     * @param {number} maxDistance: Radios in Meters for search
     * @param {Object} filter: aditional filter for search by location
     * @param {string} selectValues: select values
     */
    findByLocation(coordinates, maxDistance, filter = {}, selectValues = '') {
        const searchByLocation =  {
            geoPosition: {
                $near: {
                    $maxDistance: maxDistance,
                    $geometry: { 
                        type: constants.houseConst.geoLocationPoint,
                        coordinates: [coordinates.x, coordinates.y] 
                    }
                }
            },
            ...filter
        };
        
        return new Promise((resolve, reject) => {
            this.driver.findByFilter(this._model, searchByLocation, selectValues, (err, info) => {
                if(err) {
                    reject({ status: constants.httpConst.CLIENT_ERROR, error: err });
                }
                else {
                    resolve({ status: constants.httpConst.OK, info: info });
                }
            });
        });
    }
}

module.exports = HouseModel;