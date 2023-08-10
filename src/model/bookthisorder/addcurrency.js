const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  addcurrency : {
    type:String
  },
});
const currenyModel = mongoose.model("currency", currencySchema);

module.exports = currenyModel;
