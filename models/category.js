var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoryschema = new Schema(
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
  { collection: "category", timestamps: true }
);

module.exports = mongoose.model("Category", categoryschema);
