var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productsizeschema = new Schema(
  {
    code: {
      type: String,
    },
    productCount: {
      type: Number,
    },
  },
  { collection: "productsize", timestamps: true }
);

module.exports = mongoose.model("ProductSize", productsizeschema);
