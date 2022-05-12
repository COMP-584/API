const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;

//Set up default mongoose connection
exports.connectDB = async () => {
    try {
        await mongoose.connect(mongoDB);
        console.info("Connected to mongodb");
    } catch (error) {
        console.error(error);
    }
}


