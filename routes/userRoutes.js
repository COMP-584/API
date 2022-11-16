const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser
  
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);  
router.route("/:id").get(protect, getUserById);
router.route("/:id").delete(protect, deleteUser);
// hi


module.exports = router;