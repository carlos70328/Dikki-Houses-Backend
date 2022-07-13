class ImageManagerInterface {

    constructor(driver){
        this.driver = driver;
    }

    uploadImages(images, folder, callback){
        return new Promise((resolve, reject) => {
            const promises = images.map(dataImage => 
                this.driver.uploadImage(dataImage.originalname, { folder: folder }) 
            );
    
            Promise.all(promises)
                .then(results => resolve({ status: constants.httpConst.OK, info: results}))
                .catch(err => reject({ status: constants.httpConst.CLIENT_ERROR, error: err }));
        });
    }
}

module.exports = ImageManagerInterface;