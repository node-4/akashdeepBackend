const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const citySchema = mongoose.Schema({
  selectcity: {
    type: String
  },
  state: {
    type: objectId,
    ref: "city"
  },
  country: {
    type: objectId,
    ref: "city"
  },
  type: {
    type: String,
    enum: ["city", "state", "country"],
    default: "city",
  },
  countryType: {
    type: String,
    enum: ["overseas", "other"],
  },
});
const cityModel = mongoose.model("city", citySchema);
module.exports = cityModel;
