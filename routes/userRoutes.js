const {
  registerUser,
  authUser,
  allUsers
} = require("../controllers/userControllers");
// const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.route("/").get(allUsers);
router.post("/create", registerUser);
router.post("/login", authUser);

module.exports = router;