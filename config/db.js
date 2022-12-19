const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URI;

//Set up default mongoose connection
exports.connectDB = async () => {
  await mongoose.connect(mongoDB);
  console.info("Connected to mongodb");
};
