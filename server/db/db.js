const mongoose = require('mongoose');


const mongoURI = process.env.MONGOURI;

mongoose.connect(mongoURI).then(()=>{
  console.log("MongoDB Connected");
}).catch();

module.exports = mongoose;