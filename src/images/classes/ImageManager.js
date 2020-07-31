const ImageManagerInterface = require('../interfaces/ImageManagerInterface');

class ImageManager extends ImageManagerInterface {

    constructor(driver){
        super(driver);
    }
}

module.exports = ImageManager;