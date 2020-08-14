class ImageManagerInterface {

    constructor(driver){
        this.driver = driver;
    }

    uploadImages(images, folder, callback){
        return new Promise((resolve, reject) => {
            const promises = images.map(dataImage => 
                this.driver.uploadImage(dataImage.path, { folder: folder }) 
            );
    
            Promise.all(promises)
                .then(results => resolve({info: results, status: constants.httpConst.OK}))
                .catch(err => reject({error: err, status: constants.httpConst.CLIENT_ERROR}));
        });
    }
}

module.exports = ImageManagerInterface;