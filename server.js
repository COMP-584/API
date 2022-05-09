const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
//const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const colors = require("colors");




dotenv.config();

connectDB();
const app = express();

app.get('/', (req, res) =>{
    res.send("API is Running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000

app.listen(5000, console.log(`Server started on PORT ${PORT}`.yellow.bold));