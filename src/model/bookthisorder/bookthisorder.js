const mongoose = require("mongoose");

const bookthisorderSchema = mongoose.Schema({
  selectcity: {
    type: String,
  },
  selectcurrency: {
    type: String,
  },
  forexAmount: {
    type: Number,
  },
  INR_Amount:{
    type:Number
  },
  total:{
    type:Number
  }
});
const bookthisorderModel = mongoose.model("bookthisorder", bookthisorderSchema);

module.exports = bookthisorderModel;
