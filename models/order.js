var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderschema = new Schema(
  {
    code: {
      type: String,
    },
    userCode: {
      type: String,
    },
    promotionCode: {
      type: String,
    },
    orderDetailCode: {
      type: String,
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
