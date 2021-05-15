var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productsizeschema = new Schema(
  {
    code: {
      type: String,
    },
    sizeCode: {
      type: String,
    },
    productCount: {
      type: String,
    }
  },
  { collection: "productsize", timestamps: true }
);

module.exports = mongoose.model("ProductSize", productsizeschema);
