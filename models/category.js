var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoryschema = new Schema(
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
    imagePath: {
      type: String,
    },
    groupCode: {
      type: String
    }
  },
  { collection: "category", timestamps: true }
);

module.exports = mongoose.model("Category", categoryschema);
