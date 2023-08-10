const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const  panSchema = mongoose.Schema(
  {
    pan : {
      type: String,
    },
    otp : {
      type: String,
    },
    ref_id : {
      type: String,
    },
  },
  {
    timestamps : true,
  }
)

module.exports = mongoose.model("pann", panSchema);
