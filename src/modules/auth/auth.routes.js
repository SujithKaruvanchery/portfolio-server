const express = require("express");
const router = express.Router();
const { register, login, me } = require("./auth.controller");
const validate = require("../../middlewares/validate.middleware");
const { protect } = require("../../middlewares/auth.middleware");
const { loginSchema, registerSchema } = require("./auth.validation");
const { authLimiter } = require("../../middlewares/rateLimiter.middleware");

router.post("/register", validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", protect, me);

module.exports = router;