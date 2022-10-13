// const dotenv = require("dotenv"); // may not need this

console.log("env is ==> +++++=====>>", process.env.CURRENT_ENV);

const express = require("express");
const { connectDB } = require("./config/db");
const { initRoutes } = require("./initRoutes.js");
var cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(cors()); // enabling all CORS requests

connectDB();
initRoutes(app);

module.exports = app;
