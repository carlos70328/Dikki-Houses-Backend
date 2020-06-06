var cloudinary = require('cloudinary').v2

cloudinary.uploader.upload("./public/test-pattern.png", 
  {"cloud_name": "dth8mghha","api_key": "126434579775861", "api_secret": "EFEGmL3Vwn7hZ0-ARNCIeJUzJTw"},
  (error, result) => {
    console.log("KERROR", error)
    console.log("KRESULT", result) 
  }
);