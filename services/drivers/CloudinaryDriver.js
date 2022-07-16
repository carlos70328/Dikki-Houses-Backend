const ImageInterface = require("../interfaces/ImageInterface");

class CloudinaryDriver extends ImageInterface {
   constructor(service, configData) {
      super(service, configData);
      this.configurateService();
   }

   configurateService() {
      this.service.config(this.configData);
   }

   async uploadImage({ content, fileName }, properties) {
      const uploader = await this.service.uploader.upload(content, properties);
      return {
         name: fileName,
         ...this.transformFormat(uploader)
      };
   }

   transformFormat(imageInfo) {
      return {
         id: imageInfo.asset_id,
         public_id: imageInfo.public_id,
         type: imageInfo.resource_type,
         url: imageInfo.secure_url,
         date: imageInfo.created_at
      };
   }
}

module.exports = CloudinaryDriver;
