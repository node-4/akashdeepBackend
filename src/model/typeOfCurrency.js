const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const typeOfCurrencySchema = mongoose.Schema({
  currencyType: {
    type: String,
  },

});

module.exports = mongoose.model("typeOfCurrency", typeOfCurrencySchema);
