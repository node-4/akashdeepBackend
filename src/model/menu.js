const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  data : {
    type:String
  },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
  },
});

const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
