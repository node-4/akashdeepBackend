const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const subservicesSchema = mongoose.Schema({
  subservices: {
    type: String,
  },

});

module.exports = mongoose.model("subservice", subservicesSchema);
