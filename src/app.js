const cors = require("cors");
const express = require("express");

const userRouter = require("./routers/user");

const app = express();

app.use(express.json());

// CORS request headers
app.use(cors());

app.use(userRouter);

module.exports = app;
