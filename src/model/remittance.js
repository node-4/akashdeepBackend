const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;


const remittanceSchema = mongoose.Schema({
  city : {
    type:objectId,
    ref:"city"
  },
  optionBestDescribeYou:{
    type:objectId,
    ref:"bestDescribe"
  },
  name:{
    type:String
  },
 mobile:{
    type:String
 },
 email:{
    type:String
 },
 monthlyImport_Export:{
    type:Number
 },
 purpose:{
  type:String,
  default:""
 }
 });

const remittanceModel = mongoose.model("remittance", remittanceSchema);

module.exports = remittanceModel;
