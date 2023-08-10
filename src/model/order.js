const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const orderSchema = mongoose.Schema({
  order_id: {
    type: String,
  },
  to_currency: {
    type: String,
  },
  to_amount: {
    type: String,
  },
  purpose: {
    type: String,
  },
  return_url: {
    type: String,
  },
  remitter_id: {
    type: String,
  },
  beneficiary_id: {
    type: String,
  },
  customer_details: [
    {
      pan: {
        type: String,
      },
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      phone_number: {
        type: String,
      },
      email: {
        type: String,
      },
      nationality: {
        type: String,
      },
      dob: {
        type: String,
      },
      aadhar_number: {
        type: String,
      },
      passport_details: {
        passport_number: {
          type: String,
        },
        place_of_issue: {
          type: String,
        },
        issue_date: {
          type: String,
        },
        expiry_date: {
          type: String,
        },
      },
    },
  ],
  customer_relationship: {
    type: String,
  },
  remarks: {
    type: String,
  },
  customer_declaration: {
    type: String,
  },
  status:{
    type:String,
    default:""
  },
  userid:{
    type:objectId,
    ref:"remitter"
  },
  remitterid:{
    type:objectId,
    ref:"remitter1"
  },
  beneficiaryid:{
    type:objectId,
    ref:"beneficiary"
  }
 
  
});

module.exports = mongoose.model("order", orderSchema);
