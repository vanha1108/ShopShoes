var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderschema = new Schema(
  {
    orderCode: {
      type: INTEGER,
    },
    fullName: {
      type: STRING,
    },
    phone: {
      type: STRING,
    },
    address: {
      type: STRING,
    },
    status: {
     type: INTEGER,
    },
    totalPrice: {
        type: DECIMAL,
    },
    promotionCode: {
        type: STRING,
    },
    payment: {
        type: STRING,
    },
    dateOfReturn: {
        type: DATEONLY,
    }
  },
  { collection: "order", timestamps: true }
);

module.exports = mongoose.model("Order", orderschema);
