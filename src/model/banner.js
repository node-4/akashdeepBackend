const mongoose = require("mongoose");

const BannerSchema = mongoose.Schema({
  topic :{
    type:String
  },
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/008/154/360/small/student-logo-vector.jpg",
  },
  desc: {
    type: String,
  },
});

const bannermodel = mongoose.model("banner", BannerSchema);

module.exports = bannermodel;
