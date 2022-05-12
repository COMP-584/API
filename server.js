const dotenv = require("dotenv");
dotenv.config({ path: 'config/.env' });
const express = require("express");
const { connectDB } = require("./config/db");
const { initRoutes } = require("./initRoutes.js");
var cors = require('cors')
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(cors({
    origin: '*'
}))

connectDB();
initRoutes(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));