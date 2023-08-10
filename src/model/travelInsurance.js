const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const travelSchema = mongoose.Schema({
  destination : {
    type: objectId,
    ref:"destination"
  },
  destinationName:{
    type:String
  },  
  ageOfTraveller: {
    type:Array
  },
  startDate:{
    type:String,
    default:""
  },
  endDate:{
    type:String,
    default:""
  },
  panCard:{
    type:Array
  },
  uploadPanCard:{
    type:Array
  },
  ticketNumber:{
    type:Array,
    },
  uploadTicket:{
    type:Array
  },
  passport:{
    type:Array
  },
  uploadPassport:{
    type:Array
  },
  visa:{
    type:Array
  },
  uploadVisa:{
    type:Array
  },
  insuranceAmtFull:{
    type:String,
    default:""
  }
 })

module.exports = mongoose.model("travelInsurance", travelSchema);
