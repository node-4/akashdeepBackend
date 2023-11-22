const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  selectcity: {
    type: String
  },
  type: {
    type: String,
    enum: ["city", "country"],
    default: "city",
  },
});
const cityModel = mongoose.model("city", citySchema);

module.exports = cityModel;
