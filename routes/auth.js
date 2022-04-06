const express = require("express");
const authController = require("../controllers/auth");
const rateLimiter = require("../middleware/rate-limit");
const router = express.Router;

router.post("/signup", rateLimiter, authController.signup);
router.post("/login", rateLimiter, authController.login);

module.exports = router;
