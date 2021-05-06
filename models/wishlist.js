var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var wishlistschema = new Schema(
  {
    summary: {
      type: String,
    }
  },
  { collection: "wishlist", timestamps: true }
);

module.exports = mongoose.model("WishList", wishlistschema);
