var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderschema = new Schema(
  {
    orderCode: {
      type: Number,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
     type: Number,
    },
    totalPrice: {
        type: Number,
    },
    promotionCode: {
        type: String,
    },
    payment: {
        type: String,
    },
    dateOfReturn: {
        type: Date,
    }
  },
  { collection: "order", timestamps: true }
);

module.exports = mongoose.model("Order", orderschema);
