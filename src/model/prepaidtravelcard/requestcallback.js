const mongoose = require("mongoose");

const requestcallbackSchema = mongoose.Schema({
  fullname: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  topic: {
    type: String,
  },
  subtopic :{
    type:String
  },
  image: {
    type: String,
    default:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  }
 
});
const requestcallModel = mongoose.model("requestcall", requestcallbackSchema);

module.exports = requestcallModel;
