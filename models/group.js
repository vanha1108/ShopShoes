var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var groupschema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    summary: {
      type: String,
    }
  },
  { collection: "group", timestamps: true }
);

module.exports = mongoose.model("Group", groupschema);
