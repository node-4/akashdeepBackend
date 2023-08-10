const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const prepaidtravelSchema = mongoose.Schema({
  selectCity: {
    type: objectId,
    ref: "city",
  },
  city: {
    type: String,
  },
  currency: {
    type: objectId,
    ref: "currency",
  },
  currencyToChange: {
    type: String,
  },
  forexAmount: {
    type: Number,
  },
  ConvertedAmountToINR: {
    type: Number,
  },
  total: {
    type: Number,
  },
  /////////////////////////////////////////////
  uploadPanCard: {
    type: String,
    default: "",
  },
  panCard:{
    type:String,
    default:""
  },
  panStatus:{
    type:String
  },
  PassportFront: {
    type: String,
    default: "",
  },
  PassportBack: {
    type: String,
    default: "",
  },
  airTicket: {
    type: String,
    default: "",
  },
  validVisa: {
    type: String,
    default: "",
  },
  data1: {
    type: String,
    default: "false",
  },
  data2: {
    type: String,
    default: "false",
  },
  ///////////////////////////////////////////////
  purpose: {
    type: objectId,
    ref: "purpose",
  },
  purposeName:{
    type:String
  },
  exchangeRate : {
    type: String,
    default: "",
  },
  transferAmountInFCY : {
    type: String,
    default: "",
  },
  RemittanceServiceCharge : {
    type: String,
    default: "",
  },
  GstOnCharge: {
    type: String,
    default: "",
  },
  GstOnCurrencyConversion : {
    type: String,
    default: "",
  },
  TCS: {
    type: String,
    default: "",
  },
  TCS_flag: {
    type: String,
    default: "",
  },
  TotalFundingAmtInINR: {
    type: String,
    default: "",
  },
  TotalOfAllChargesAndTaxes: {
    type: String,
    default: "",
  },
  buy_reload_unload:{
    type:String,
    enum:["buy","reload","unload"],
    default:"buy"
  }
})
const prepaidtravelcardModel = mongoose.model(
  "prepaidtravelcard",
  prepaidtravelSchema
)
module.exports = prepaidtravelcardModel;
