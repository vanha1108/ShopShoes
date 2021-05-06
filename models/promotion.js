var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var promotionschema = new Schema(
  {
    promotionCode: {
      type: String,
    },
    promotionValue: {
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
