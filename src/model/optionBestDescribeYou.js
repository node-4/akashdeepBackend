const mongoose = require("mongoose");

const optionBestDescribeSchema = mongoose.Schema({
    optionBestDescribe : [{
    type:String
  }],
 });

const optionBestDescribeModel = mongoose.model("bestDescribe", optionBestDescribeSchema);

module.exports = optionBestDescribeModel;
