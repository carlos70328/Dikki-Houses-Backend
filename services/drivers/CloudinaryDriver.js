const ImageInterface = require('../interfaces/ImageInterface');

class CloudinaryDriver extends ImageInterface {

    constructor(service, configData){
        super(service, configData);
        this.configurateService();
    }

    configurateService(){
        this.service.config(this.configData); 
    }

    async uploadImage(imagePath, properties){
        console.log("los negritos")
        console.log(imagePath, properties);
        const uploader = await this.service.uploader.upload(imagePath, properties);

        return this.transformFormat(uploader)
    }

    async transformFormat(imageInfo){
        return new Promise((resolve, reject) => {
            resolve({
                id: imageInfo.asset_id,
                public_id: imageInfo.public_id,
                name: imageInfo.original_filename,
                type: imageInfo.resource_type,
                url: imageInfo.secure_url,
                date: imageInfo.created_at,
            });
        });
    }
}

module.exports = CloudinaryDriver;