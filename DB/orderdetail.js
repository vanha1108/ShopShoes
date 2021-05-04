var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderdetailschema = new Schema(
  {
    unitAmount: {
      type: INTEGER,
    },
    unitPrice: {
      type: DECIMAL,
    },
    isReturn: {
      type: BOOLEAN,
    }
  },
  { collection: "orderdetail", timestamps: true }
);

module.exports = mongoose.model("OrderDetail", orderdetailschema);
