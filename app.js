const express = require("express");
const { connectDB } = require("./config/db");
const { initRoutes } = require("./initRoutes.js");
var cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // enabling all CORS requests
connectDB();
initRoutes(app);
module.exports = app;