var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userschema = new Schema(
  {
    googleId: {
      type: STRING,
    },
    facebookId: {
      type: STRING,
    },
    fullName: {
      type: STRING,
    },
    email: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
    phone: {
        type: STRING,
    },
    address: {
        type: STRING,
    },
    avatarPath: {
        type: STRING,
    },
    gender: {
        type: INTEGER,
    },
    birthday: {
        type: DATEONLY,
    },
    score: {
        type: INTEGER,
    },
    isAdmin: {
        type: BOOLEAN,
    },
    isConfirm: {
        type: BOOLEAN,
    },
    isLock: {
        type: BOOLEAN,
    },
    authType: {
        type: STRING,
    }
  },
  { collection: "user", timestamps: true }
);

module.exports = mongoose.model("User", userschema);
