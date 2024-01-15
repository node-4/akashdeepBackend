const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  addcurrency: {
    type: String
  },
  type: {
    type: String,
    enum: ["overseas", "other"],
    default: "overseas",
  },
});
const currenyModel = mongoose.model("currency", currencySchema);

module.exports = currenyModel;
