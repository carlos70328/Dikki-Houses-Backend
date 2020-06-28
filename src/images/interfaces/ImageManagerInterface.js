class ImageManagerInterface {

    constructor(service, configData){
        this.service = service;
        this.configData = configData;
    }

    /**
     * you must create all resources and set all configurations to ImageManager
     * 
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     */
    configurateService(){
        throw new Error("You must Implement configurateService");
    }

    /**
     * you must upload images to the image service
     * 
     * YOU MUST IMPLEMENT THIS METHOD IF USE THIS INTERFACE
     * @param {Array<Object>} images 
     * @param {string} path 
     */
    uploadImage(images, path){
        throw new Error("You must Implement uploadImage");
    }
}