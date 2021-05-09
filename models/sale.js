var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var saleschema = new Schema(
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
  { collection: "sale", timestamps: true }
);

module.exports = mongoose.model("Sale", saleschema);
