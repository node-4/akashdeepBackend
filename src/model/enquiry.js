const mongoose = require("mongoose");

const enquirySchema = mongoose.Schema({
  phone: { type: String, require: false },
  enquiryType: {
    type: String
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const enquiryModel = mongoose.model("enquiry", enquirySchema);

module.exports = enquiryModel;
