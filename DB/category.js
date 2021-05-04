var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoryschema = new Schema(
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
  { collection: "category", timestamps: true }
);

module.exports = mongoose.model("Category", categoryschema);
