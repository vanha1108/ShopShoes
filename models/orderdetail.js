var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderdetailschema = new Schema(
  {
    unitAmount: {
      type: Number,
    },
    unitPrice: {
      type: Number,
    },
    isReturn: {
      type: Boolean,
    }
  },
  { collection: "orderdetail", timestamps: true }
);

module.exports = mongoose.model("OrderDetail", orderdetailschema);
