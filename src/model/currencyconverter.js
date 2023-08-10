const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const CurrencyconverterSchema = mongoose.Schema({
    CurrencyConverter: {
    type: String,
  },

});

module.exports = mongoose.model("Currencyconverter", CurrencyconverterSchema);
