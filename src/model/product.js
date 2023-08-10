const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product : [{
    type:String
  }],
 });

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
