const mongoose = require("mongoose");

const enquirydropdownSchema = mongoose.Schema({
  data : {
    type:String
  }
});

const enquirydropdownModel = mongoose.model("enquirydropdown", enquirydropdownSchema);

module.exports = enquirydropdownModel;
