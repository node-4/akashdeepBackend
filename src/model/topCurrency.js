const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const topCurrencySchema = mongoose.Schema({
  topCurrency: {
    type: String,
  },

});

module.exports = mongoose.model("topCurrency", topCurrencySchema);
