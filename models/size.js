var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sizeschema = new Schema(
  {
    code: {
      type: String,
    },
    productSizeCode: {
      type: String,
    },
    sizeName: {
      type: String,
    },
    sizeType: {
      type: String,
    }
  },
  { collection: "size", timestamps: true }
);

module.exports = mongoose.model("Size", sizeschema);
