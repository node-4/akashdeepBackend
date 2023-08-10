const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const remitter1Schema = mongoose.Schema({
  remitter_id: {
    type: String,
    require: false,
  },
  purpose: {
    type: String,
  },
  account_number: {
    type: String,
  },
  ifsc: {
    type: String,
  },
  pan: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
  },
  education_loan: {
    type: String,
    default: false,
  },
  nationality: {
    type: String,
  },
  bank_code: {
    type: String,
  },
  userid:{
    type:objectId,
    ref:"remitter"
  }
 
});

const remitterModel = mongoose.model("remitter1", remitter1Schema);

module.exports = remitterModel;
