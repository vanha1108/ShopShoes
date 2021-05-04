var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var promotionschema = new Schema(
  {
    promotionCode: {
      type: STRING,
    },
    promotionValue: {
      type: DECIMAL,
    },
    startDate: {
      type: DATEONLY,
    },
    endDate: {
      type: DATEONLY,
    }
  },
  { collection: "promotion", timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionschema);
