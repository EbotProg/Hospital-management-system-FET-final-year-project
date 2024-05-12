const mongoose = require("mongoose");
// require("dotenv").config();
// console.log('dburi', process.env.dbURL)
// const connection = mongoose.connect(process.env.dbURL || 'mongodb://mongo_db:27017/hospital');
const connection = (uri) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri)
};

module.exports = { connection };
