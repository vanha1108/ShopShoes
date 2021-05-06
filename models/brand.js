var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var brandschema = new Schema(
  {
    name: {
      type: String,
    },
    summary: {
      type: String,
    },
    imagePath: {
      type: String,
    },
    alias: {
      type: String,
    }
  },
  { collection: "brand", timestamps: true }
);

module.exports = mongoose.model("Brand", brandschema);
