var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userschema = new Schema(
  {
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
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
    avatarPath: {
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
    },
    isConfirm: {
        type: Boolean,
    },
    isLock: {
        type: Boolean,
    },
    authType: {
        type: String,
    }
  },
  { collection: "user", timestamps: true }
);

module.exports = mongoose.model("User", userschema);
