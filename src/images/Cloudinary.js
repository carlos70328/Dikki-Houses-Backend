const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: "dth8mghha", 
    api_key: "126434579775861", 
    api_secret: "EFEGmL3Vwn7hZ0-ARNCIeJUzJTw"
})

class imageManager {

    constructor(service, configData){
        this.service = service;
    }

    configurateService(configData){
        this.service.config(configData);
    }

}