var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productimageschema = new Schema(
  {
    code: {
      type: String,
    },
    imagePath: {
      type: String,
    },
  },
  { collection: "productimage", timestamps: true }
);

module.exports = mongoose.model("ProductImage", productimageschema);
