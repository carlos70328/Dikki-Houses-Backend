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
        this._houseModel = this.driver.createModel(this.modelName, this.schema);
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

    /**
     * Save info in database
     * @param {JsonObject} info 
     */
    saveInfo(info){
        return new Promise ((resolve, reject) => {
            console.log(info)
            const data = new this._houseModel(info);
            data.save((err, dataSaved) => {
                console.log("SAVED");
                if (err){
                    console.log("ERROR", err)
                    reject(err);
                } 
                if(dataSaved){
                    console.log("OKI", dataSaved)
                    resolve();
                } 
            })
        });
    }
}

module.exports = ModelInterface;