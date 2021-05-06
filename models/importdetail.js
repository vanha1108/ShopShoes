var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var importdetailschema = new Schema(
  {
    amount: {
      type: Number,
    },
    importPrice: {
      type: Number,
    },
    imagePath: {
      type: String,
    },
    alias: {
      type: String,
    }
  },
  { collection: "importdetail", timestamps: true }
);

module.exports = mongoose.model("ImportDetail", importdetailschema);
