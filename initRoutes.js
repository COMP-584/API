const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
exports.initRoutes = (app) => {
    app.use("/api/user", userRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/message", messageRoutes);
}