const mongoose = require("mongoose");

const betterRteSchema = mongoose.Schema({
  orderType : {
    type:String,
    default:''
  },
  currency: {
    type: String,
  },
  product:{
    type:String
  },
  Forexamount:{
    type:String
  },
  INRamount:{
    type:String
  },
  city:{
    type:String
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  }

});

const betterRateModel = mongoose.model("betterRate", betterRteSchema);

module.exports = betterRateModel;
