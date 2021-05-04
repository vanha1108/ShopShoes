var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productschema = new Schema(
  {
    name: {
      type: STRING,
    },
    productCode: {
      type: INTEGER,
    },
    status: {
      type: STRING,
    },
    description: {
      type: TEXT,
    },
    alias: {
        type: STRING,
    },
    color: {
        type: TEXT,
    },
    imagePath: {
        type: STRING,
    },
    promotion: {
        type: DECIMAL,
    },
    importPrice: {
        type: DECIMAL,
    },
    sellPrice: {
        type: DECIMAL,
    }
  },
  { collection: "product", timestamps: true }
);

module.exports = mongoose.model("Product", productschema);
