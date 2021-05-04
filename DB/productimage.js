var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productimageschema = new Schema(
  {
    imagePath: {
      type: STRING,
    },
  },
  { collection: "productimage", timestamps: true }
);

module.exports = mongoose.model("ProductImage", productimageschema);
