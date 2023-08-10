const mongoose = require("mongoose");

const alertSchema = mongoose.Schema({
  alert : {
    type:String
  },
  currency: {
    type: String,
  },
  product:{
    type:String
  },
  city:{
    type:String
  },
  IsBetterThen:{
    type:String
  },
  emailAt:{
    type:String
  },
  call_sms:{
    type:String
  }
});

const alertModel = mongoose.model("alert", alertSchema);

module.exports = alertModel;
