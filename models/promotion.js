var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var promotionschema = new Schema(
  {
    code: {
      type: String,
    },
    value: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    }
  },
  { collection: "promotion", timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionschema);
