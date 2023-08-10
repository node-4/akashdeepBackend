const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const remitterSchema = mongoose.Schema({
  phoneNumber: { type: String, require: false },
  google_id: { type: String },
  FullName: {
    type: String,
  },
  email: {
    type: String,
  },

//   password: {
//     type: String,
//   },
//   confirmPassword: { type: String },
  otp: { type: String },
  Token: { type: String },
//   profileImage: {
//     type: String,
//     default:
//       "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
//   },

beneficiary_id: {
  type:String
},
account_holder_name:{
  type:String
} ,
account_number: {
  type:String
},
swift_code:{
  type:String
} ,
iban:{
  type:String
} ,
routing_number:{
  type:String
},
 bank_name:{
  type:String
 } ,
 bank_country:{
  type:String
 } ,
 sort_code:{
  type:String
 } ,
 transit_code:{
  type:String
 } ,
 bsb_number: {
  type:String
 },
 address: {
  type:String
 },
 city: {
  type:String
 },
  state: {
    type:String
  },
 country: {
  type:String
 },
 postal_code: {
  type:String
 }

});

const remitterModel = mongoose.model("remitter", remitterSchema);

module.exports = remitterModel;
