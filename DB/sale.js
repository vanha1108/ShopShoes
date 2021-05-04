var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var saleschema = new Schema(
  {
    name: {
      type: STRING,
    },
    summary: {
      type: TEXT,
    }
  },
  { collection: "sale", timestamps: true }
);

module.exports = mongoose.model("Sale", saleschema);
