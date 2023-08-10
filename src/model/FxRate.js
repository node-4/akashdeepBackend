const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const FxRateSchema = mongoose.Schema({
    to_currency:{
        type:String
    },
  to_amount:{
    type:String
  },
  from_amount:{
    type:String
  },
  purpose:{
    type:String
  },
  remitter_id:{
    type:String
  },
  customer_declaration:{
    type:String
  },
  education_loan:{
    type:String
  },
});

module.exports = mongoose.model("FxRate", FxRateSchema);
