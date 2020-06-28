const ImageManagerInterface = require('../interfaces/ImageManagerInterface');

class CloudinaryService extends ImageManagerInterface {

    constructor(service, configData){
        super(service, configData);
        this.configurateService();
    }

    configurateService(){
        this.service.config(this.configData); 
    }

    uploadImage(path, folder){
        this.service.uploader.upload(path, {
            "public_id": folder,
            "overwrite": true
        })
    }
}