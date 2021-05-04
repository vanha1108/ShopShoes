var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var groupschema = new Schema(
  {
    name: {
      type: STRING,
    },
    summary: {
      type: TEXT,
    },
    alias: {
      type: STRING,
    }
  },
  { collection: "group", timestamps: true }
);

module.exports = mongoose.model("Group", groupschema);
