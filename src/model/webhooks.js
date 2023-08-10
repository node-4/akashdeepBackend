const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const webhooksSchema = mongoose.Schema({
  payment_url: {
    type: String,
  },
  refund_url: {
    type: String,
  },
  order_url: {
    type: String,
  },
});

module.exports = mongoose.model("webhooks", webhooksSchema);
