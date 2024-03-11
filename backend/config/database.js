const mongoose = require("mongoose");
const { DB_URL } = require("./config");

module.exports.connectDatabse = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("Problem connecting to databse: %s", error.message);
  }
};