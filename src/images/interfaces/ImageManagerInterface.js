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
                .then(results => resolve(results))
                .catch(err => reject(err));
        });
    }
}

module.exports = ImageManagerInterface;