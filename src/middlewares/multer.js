const multer = require("multer");
const path = require("path");

module.exports = multer({
   storage: multer.diskStorage({}),
   fileFilter: (req, file, cb) => {
      let exp = path.extname(file.originalname);
      if (exp !== ".jpg" && exp !== ".jpeg" && exp !== ".png") {
         cb(new Error("Only images are allowed"), false);
         return;
      }
      cb(null, true);
   }
});
