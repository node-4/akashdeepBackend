const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const foriegncurrencySchema = mongoose.Schema({
  selectCity: {
    type: objectId,
    ref: "city",
  },
  city:{
    type:String
  },
  currencyYouHave: {
    type: objectId,
    ref: "currency",
  },
  currencyHave:{
    type:String
  },
  currencyYouWant: {
    type: objectId,
    ref: "currency",
  },
  currencyWant:{
    type:String
  },
  forexcard: {
    type: String,
  },
  forexAmount: {
    type: Number,
  },
  ConvertedAmount: {
    type: Number,
  },
  total: {
    type: Number,
  },

  /////////////////////////////////////////////
  phone:{
    type:String,
    default:""
  },
  otp:{
    type:String,
    default:""
  },
  email:{
    type:String,
    default:""
  },
  /////////////////////////////////////////////
  name:{
    type:String,
    default:""
  },
  mobile:{
    type:String,
    default:""
  },
  panCard:{
    type:String,
    default:""
  },
  uploadPanCard:{
    type:String,
    default:""
  },
  panStatus:{
    type:String
  },
  passport:{
    type:String,
    default:""
  },
  uploadPassport:{
    type:String,
    default:""
  },
  ///////////////////////////////////////////////
  beneficiaryName:{
    type:String,
    default:""
  },
  transactionAmount:{
    type:String,
    default:""
  },
  AmountInWords:{
    type:String,
    default:""
  },
  beneficiaryAccountNumber:{
    type:String,
    default:""
  },
  ifscCode:{
    type:String,
    default:""
  },
  bankNameAndAddress:{
    type:String,
    default:""
  },
  referenceNo_OrderID:{
    type:String,
    default:""
  },
  ///////////////////////////////////////////////////////
  challenCreatedOn:{
    type:String,
    default:""
  },
  CA_Number:{
    type:String,
    default:""
  },
  emailAddress:{
    type:String,
    default:""
  },
  customerID:{
    type:String,
    default:""
  },
  mobile:{
    type:String,
    default:""
  }
});

const foriegncurrencyModel = mongoose.model(
  "foriegncurrency",
  foriegncurrencySchema
);

module.exports = foriegncurrencyModel
