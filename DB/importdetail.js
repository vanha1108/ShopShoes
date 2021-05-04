var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var importdetailschema = new Schema(
  {
    amount: {
      type: INTEGER,
    },
    importPrice: {
      type: DECIMAL,
    },
    imagePath: {
      type: STRING,
    },
    alias: {
      type: STRING,
    }
  },
  { collection: "importdetail", timestamps: true }
);

module.exports = mongoose.model("ImportDetail", importdetailschema);
