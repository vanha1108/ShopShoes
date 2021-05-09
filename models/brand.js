var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var brandschema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    summary: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  { collection: "brand", timestamps: true }
);

module.exports = mongoose.model("Brand", brandschema);
