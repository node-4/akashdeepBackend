const mongoose = require("mongoose");

const destinationSchema = mongoose.Schema({
  destination : {
    type:String
  },
});
const destinationModel = mongoose.model("destination", destinationSchema);

module.exports = destinationModel;
