const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const FxRateSchema = mongoose.Schema({
        to_currency: {
                type: String
        },
        from_currency: {
                type: String
        },
        amount: {
                type: Number
        },
});

module.exports = mongoose.model("rate", FxRateSchema);
