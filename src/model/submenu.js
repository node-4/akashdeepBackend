const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const menuSchema = mongoose.Schema({
  menu: {
    type: String,
    require: true,
  },
  subMenu: {
    type: [objectId],
    ref: "menu",
  },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
  },
});

module.exports = mongoose.model("submenu", menuSchema);
