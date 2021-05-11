var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var importdetailschema = new Schema(
  {
    code: {
      type: String,
    },
    productSizeCode: {
      type: String,
    },
    importDetailCode: {
      type: String,
    },
    amount: {
      type: Number,
    },
    importPrice: {
      type: Number,
    }
  },
  { collection: "importdetail", timestamps: true }
);

module.exports = mongoose.model("ImportDetail", importdetailschema);
