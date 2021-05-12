var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderdetailschema = new Schema(
  {
    code: {
      type: String,
    },
    productSizeCode: {
      type: String,
    },
    orderCode: {
      type: String,
    },
    amount: {
      type: Number,
    },
    price: {
      type: Number,
    }
  },
  { collection: "orderdetail", timestamps: true }
);

module.exports = mongoose.model("OrderDetail", orderdetailschema);
