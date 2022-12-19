const express = require("express");
const {
  registerUser,
  authUser,
  // deleteUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
// router.delete("/:id", protect, deleteUser);

module.exports = router;
