const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const wireTransferSchema = mongoose.Schema({
  tranferFrom: {
    type: objectId,
    ref: "city",
  },
  transferFromCity: {
    type: String,
  },
  transferTo: {
    type: objectId,
    ref: "city",
  },
  transferToCity: {
    type: String,
  },
  purpose: {
    type: objectId,
    ref: "purpose",
  },
  purposeName: {
    type: String,
  },
  descPurpose: {
    type: String,
  },
  receivingCurrency: {
    type: objectId,
    ref: "currency",
  },
  recievingCurrencyName: {
    type: String,
  },
  INRCurrency: {
    type: objectId,
    ref: "currency",
  },
  INRCurrencyName: {
    type: String,
  },
  recievingAmount: {
    type: Number,
    default: 0,
  },
  convertedAmount: {
    type: Number,
    default: 0,
  },

  ///////////////////////////////////////////
  //   CUSTOMER DETAILS

  pancard: {
    type: String,
  },
  Name: {
    type: String,
  },
  panStatus: {
    type: String,
  },
  AadharCard: {
    type: String,
  },
  ref_id: {
    type: String,
  },
  aadharStatus: {
    type: String,
  },

  /////////////////////////////////////////////////
  //REMITTER DETAILS

  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  AccountNumberRemitter: {
    type: String,
  },
  IFSC_Remitter: {
    type: String,
  },
  panRemitter: {
    type: String,
  },
  addressRemitter: {
    type: String,
  },
  postCodeRemitter: {
    type: String,
  },
  cityRemitter: {
    type: String,
  },
  stateRemitter: {
    type: String,
  },
  nationalityRemitter: {
    type: String,
  },
  emailIdRemitter: {
    type: String,
  },
  mobileRemitter: {
    type: String,
  },

  ///////////////////////////////////////////
  //BENEFICIARY  DETAILS

  benficiaryid: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
  sortCode: {
    type: String,
  },
  transitCode: {
    type: String,
  },
  BsbNumber: {
    type: String,
  },
  routingNumber: {
    type: String,
  },
  Iban: {
    type: String,
  },
  recieverAddress: {
    type: String,
  },
  countryBeneficiary: {
    type: String,
  },
  pinCodeBeneficiary: {
    type: String,
  },
  stateBeneficiary: {
    type: String,
  },
  emailIdBeneficiary: {
    type: String,
  },
  recieverBankName: {
    type: String,
  },
  recieverBankCountry: {
    type: String,
  },
  recieverBankSwiftCode: {
    type: String,
  },
  recieverBankAddress1: {
    type: String,
  },
  recieverBankAddress2: {
    type: String,
  },
  recieverAccountNumber: {
    type: String,
  },
  cityBeneficiary: {
    type: String,
  },
  /////////////////////////////////////////
  exchangeRate: {
    type: String,
  },
  transferAmountInFCY: {
    type: String,
  },
  remittenceServiceCharge: {
    type: String,
  },
  GstOnCharge: {
    type: String,
  },
  GstOnCurrencyConversion: {
    type: String,
  },
  tcs: {
    type: String,
  },
  tcsFlag: {
    type: String,
  },
  totalFundingInINR: {
    type: String,
  },
  TotalOfAllCharges: {
    type: String,
  },
  /////////////////////////////////////////////
  //DOCUMENT UPLOAD

  documentName: {
    type: String,
  },
  document: {
    type: String,
  },
  documentNumber: {
    type: String,
  },
  city: {
    type: String,
  },
  purposeOfIssue: {
    type: String,
  },
  dateOfIssue: {
    type: String,
  },
  countryOfIssue: {
    type: String,
  },
});
const wireModel = mongoose.model("wireTransfer", wireTransferSchema);
module.exports = wireModel;
