var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var brandschema = new Schema(
  {
    name: {
      type: STRING,
    },
    summary: {
      type: TEXT,
    },
    imagePath: {
      type: STRING,
    },
    alias: {
      type: STRING,
    }
  },
  { collection: "brand", timestamps: true }
);

module.exports = mongoose.model("Brand", brandschema);
