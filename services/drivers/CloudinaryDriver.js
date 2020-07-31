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
    }
}

module.exports = CloudinaryDriver;