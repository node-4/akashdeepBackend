const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const foriegnDemandDraftSchema = mongoose.Schema({
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
  demandDraft:{
    type:String,
    default:""
  },
  Amount:{
    type:Number,
    default:0
  },
  convertedAmt:{
    type:Number,
    default:0
  },
///////////////////////////////////////////////
mobile:{
  type:String,
  default:""
},
otp:{
  type:String
},
////////////////////////////////////////////
applicant_remitter:{
  type:String,
  enum:["applicant","remitter"],
  default:"applicant"
},
panCard:{
  type:String,
  default:""
},
uploadPanCard:{
  type:String,
},
supportingDoc:{
  type:String,
  default:""
},
uploadSupportingDoc:{
  type:String
},
/////////////////////////////////////////
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
const foriegnDemandModel = mongoose.model("foriegnDemandDraft", foriegnDemandDraftSchema);

module.exports = foriegnDemandModel;
