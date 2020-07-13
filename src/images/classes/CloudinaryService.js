const ImageManagerInterface = require('../interfaces/ImageManagerInterface');
const HttpRequestConstants = require('../../httpRequest/constants/HttpRequestConstants');

class CloudinaryService extends ImageManagerInterface {

    constructor(service, configData){
        super(service, configData);
        this.configurateService();
    }

    configurateService(){
        this.service.config(this.configData); 
    }

    uploadImages(imagesPath, folder, baseName){
        return new Promise((resolve, reject) => {
            const promises = imagesPath.map((image, index) => {
                return this.service.uploader.upload(image.path, {
                    folder: folder,
                });
            });

            Promise.all(promises).then(results => {
                console.log(data);
                resolve(results);
            }).catch((err) => {
                reject(err);
            })
        });
    }
}

module.exports = CloudinaryService;