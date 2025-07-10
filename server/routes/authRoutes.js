const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  forgotPassword,
  validateToken,
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleWare");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.get("/validate", authenticateToken, validateToken);

module.exports = router;
