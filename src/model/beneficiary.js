const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const beneficiarySchema = mongoose.Schema({
   
  beneficiary_id:{
    type:String
  },
  account_holder_name: {
    type:String
  },
  account_number: {
    type:String
  },
  swift_code:{
    type:String
  },
  iban: {
    type:String
  },
  routing_number:{
    type:String
  },
  bank_name:{
    type:String
  },
  bank_country:{
    type:String
  },
  bank_address:{
    type:String
  },
  sort_code: {
    type:String
  },
  transit_code: {
    type:String
  },
  bsb_number:{
    type:String
  },
  address:{
    type:String
  },
  city: {
    type:String
  },
  state: {
    type:String
  },
  country:{
    type:String
  },
  postal_code:{
    type:String
  }

});

module.exports = mongoose.model("beneficiary", beneficiarySchema);




