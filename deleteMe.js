/* TASK

https://medium.com/@galford151/mongoose-geospatial-queries-with-near-59800b79c0f6

add "useCreateIndex":true in mongo values in .env
add index MessageSchema.index({ location: "2dsphere" });


*/


const mongoose = require('mongoose');
const schemaH = require('./src/houses/schemas/houseSchemaDef.json');
mongoose.connect('mongodb://localhost:27017/houses?retryWrites=true&w=majority', {"useNewUrlParser":true,"useUnifiedTopology":true,"useFindAndModify":false,"useCreateIndex":true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {

  const x = 4.51237;
  const y = -75.70129;

  let MessageSchema = new mongoose.Schema({
    username: String,
    text: String,  
    geoPosition: {
      type: { type: String },
      coordinates: []
    }
  }, {
    timestamps: true
  });

  MessageSchema.index({ geoPosition: "2dsphere" });

  let Message = mongoose.model("Message", MessageSchema);

  let message = new Message({
    username: "casa uno",
    text: "casa uno",
    geoPosition: {
      type: "Point",
      coordinates: [4.51497,-75.70214]
    },
  });

  let message2 = new Message({
    username: "casa dos",
    text: "casa dos",
    geoPosition: {
      type: "Point",
      coordinates: [4.51615,-75.70268]
    },
  });

  let message3 = new Message({
    username: "casa tres",
    text: "casa tres",
    geoPosition: {
      type: "Point",
      coordinates: [4.51803,-75.70343]
    },
  });

  let message4 = new Message({
    username: "casa cuatro",
    text: "casa cuatro",
    geoPosition: {
      type: "Point",
      coordinates: [4.51901,-75.70397]
    },
  });

  let message5 = new Message({
    username: "casa cinco",
    text: "casa cinco",
    geoPosition: {
      type: "Point",
      coordinates: [4.51794,-75.69068]
    },
  });

  // message.save()
  // message2.save()
  // message3.save()
  // message4.save()
  // message5.save()

  Message.find({
    geoPosition: {
     $near: {
      $maxDistance: 1000,
      $geometry: {
       type: "house",
       coordinates: [x, y]
      }
     }
    }, 
    text: "casa dos"
   }).find((error, results) => {
    if (error) console.log(error);
    console.log(JSON.stringify(results, 0, 2));
   });

});