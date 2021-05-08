var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userschema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: Number,
    },
    birthday: {
        type: Date,
    },
    score: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
    }
  },
  { collection: "user", timestamps: true }
);

module.exports = mongoose.model("User", userschema);
