const mongoose = require('mongoose');
const schemaH = require('./src/houses/schemas/houseSchemaDef.json');
mongoose.connect('mongodb+srv://adminArriendos:T4BKvl1Q1uUX7cXhT4BKvl1Q1uUX7cXh@cluster0-7oezr.mongodb.net/houses?retryWrites=true&w=majority', {"useNewUrlParser":true,"useUnifiedTopology":true,"useFindAndModify":false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  const houseSchema = new mongoose.Schema(schemaH, {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      }
    }
  });

  const House = mongoose.model('House', houseSchema);

  let a = await House.find().select('size').exec((err, info) => {
    console.log(err)
    console.log(info)
  });
});
// ,"host":"cluster0-7oezr.mongodb.net","database":"houses","params":"retryWrites=true&w=majority"}