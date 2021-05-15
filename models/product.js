var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productschema = new Schema(
  {
    code: {
      type: String,
    },
    productCode: {
      type: String,
    },
    brandCode: {
      type: String,
    },
    categoryCode: {
      type: String,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
    color: {
        type: String,
    },
    image: {
        type: String,
    },
    thumbnail: {
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
