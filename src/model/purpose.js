const mongoose = require("mongoose");

const purposeSchema = mongoose.Schema({
  purpose: {
    type: String,
  },
  desc:{
    type:String
  },
  status:{
    type:String,
    enum:["active","block",""],
    default:""
  }
});

const purposeModel = mongoose.model("purpose", purposeSchema);

module.exports = purposeModel;
