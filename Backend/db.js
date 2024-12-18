const mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = process.env.MONGODB_URL_LOCAL; // this is url of data base


//conect to mongodb
mongoose.connect(mongodbURL, {
  useNewUrlparser: true,
  useUnifiedTopology: true,
});

//conection stablishy
const db = mongoose.connection;

// conection is stablish show messag tis is event


db.on("error", () => {
  console.log("error mongodb server");
});

db.on("connected", () => {
  console.log("consected mongodb server");
});

db.on("disconnected", () => {
  console.log("disconnected mongodb server");
});

//export database conection
module.exports = db;