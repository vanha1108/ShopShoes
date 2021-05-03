const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/shopshoes";

const connectDB  = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("Db connect...!");
};

module.exports = connectDB;
