class ImageManagerInterface {

    constructor(driver){
        this.driver = driver;
    }

    uploadImages(images, folder, callback){
        const promises = imagesPath.map(dataImage => 
            this.driver.uploadImage(dataImage.path, { folder: folder }) 
        );

        Promise.all(promises)
            .then(results => callback(undefined, results))
            .catch(err => callback(err, undefined));
    }
}

module.exports = ImageManagerInterface;