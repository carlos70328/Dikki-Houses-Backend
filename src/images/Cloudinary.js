const cloudinary = require('cloudinary');
const configObject = { 
    cloud_name: "dth8mghha", 
    api_key: "126434579775861", 
    api_secret: "EFEGmL3Vwn7hZ0-ARNCIeJUzJTw"
}

// cloudinary.config(configObject)

class imageManager {

    constructor(service, configData){
        this.service = service;

        this.configurateService(configData)
    }

    configurateService(configData){
        this.service.config(configData); 
    }

    uploadImage(path, folder){
        this.service.uploader.upload(path, {
            "public_id": folder,
            "overwrite": true
        })
    }
}

const cloud = new imageManager(cloudinary, configObject);