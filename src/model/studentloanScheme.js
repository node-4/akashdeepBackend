const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const studentLoanSchema = mongoose.Schema({
  para1: {
    type: String,
  },
  para2: {
    type: String,
  },
  moreInformation: [
    {
      type: String,
    },
  ],
  
});

module.exports = mongoose.model("studentLoan", studentLoanSchema);
