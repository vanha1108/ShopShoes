var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sizeschema = new Schema(
  {
    sizeName: {
      type: STRING,
    },
    sizeType: {
      type: STRING,
    }
  },
  { collection: "size", timestamps: true }
);

module.exports = mongoose.model("Size", sizeschema);
