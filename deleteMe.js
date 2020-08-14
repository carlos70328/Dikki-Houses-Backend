
require('dotenv').config()
const express = require('express')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

const app = express()

cloudinary.config({ 
  cloud_name: "dth8mghha", 
  api_key: "126434579775861", 
  api_secret: "EFEGmL3Vwn7hZ0-ARNCIeJUzJTw"
})
  
app.use(formData.parse())

app.post('/houses/add_houses', (req, res) => {
  console.log("ENTRARON");

  const values = Object.values(req.files)
  console.log(values);
  // const promises = values.map(image => cloudinary.uploader.upload(image.path, {
    // "file": "MiFile",
    // "folder": "miFolder",
    // "public_id": "testFolder/house",
    // "overwrite": false
  // }));

<<<<<<< Updated upstream
  const promises = values.map(image => {
    cloudinary.v2.uploader.upload(image.path, { 
      folder: "my_folder/my_sub_folder/", 
      public_id: "my_name" 
    });
=======
  // let a = await House.find().select('size').exec((err, info) => {
  //   console.log(err)
  //   console.log(info)
  // });

  const a = new House({
    name: "new name"
  })

  a.save().select("_id").exec((err, house) => {
    console.log("algo");
    
>>>>>>> Stashed changes
  });
  
  
  Promise
    .all(promises)
    .then(results => console.log(res.json(results)))
})

app.listen(process.env.PORT || 3000, () => console.log('👍'))


// var cloudinary = require('cloudinary').v2

// cloudinary.uploader.upload("./public/test-pattern.jpg", 
//   { 
//     "cloud_name": "dth8mghha",
//     "api_key": "126434579775861", 
//     "api_secret": "EFEGmL3Vwn7hZ0-ARNCIeJUzJTw",
//     "public_id": "Houses/",
//     "overwrite": true
//   },
//   (error, result) => {
//     console.log("KERROR", error)
//     console.log("KRESULT", result) 
//   }
// );