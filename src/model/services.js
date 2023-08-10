const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const servicesSchema = mongoose.Schema({
  services: {
    type: String,
   // require: true,
  },
  subservices: {
    type: [objectId],
    ref: "subservice",
  },
 
});

module.exports = mongoose.model("services", servicesSchema);
