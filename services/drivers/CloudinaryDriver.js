const ImageInterface = require('../interfaces/ImageInterface');

class CloudinaryDriver extends ImageInterface {

    constructor(service, configData){
        super(service, configData);
        this.configurateService();
    }

    configurateService(){
        this.service.config(this.configData); 
    }

    uploadImage(imagePath, properties){
        return this.service.uploader.upload(imagePath, properties);

        // const promises = imagesPath.map((image, index) => this.service.uploader.upload(image.path, { folder: folder }) );

        // Promise.all(promises)
        // .then(results => callback(undefined, results))
        // .catch((err) => callback(err, undefined));
    }
}

module.exports = CloudinaryDriver;