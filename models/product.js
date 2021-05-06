var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productschema = new Schema(
  {
    name: {
      type: String,
    },
    productCode: {
      type: Number,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
    alias: {
        type: String,
    },
    color: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    promotion: {
        type: Number,
    },
    importPrice: {
        type: Number,
    },
    sellPrice: {
        type: Number,
    }
  },
  { collection: "product", timestamps: true }
);

module.exports = mongoose.model("Product", productschema);
