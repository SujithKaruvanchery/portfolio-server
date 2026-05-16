const express = require("express");
const router = express.Router();
const { getAll, getOne, create, markRead, remove } = require("./contact.controller");
const { protect } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createContactSchema } = require("./contact.validation");
const { globalLimiter } = require("../../middlewares/rateLimiter.middleware");

// Public routes
router.post("/", globalLimiter, validate(createContactSchema), create);

// Protected routes (admin only)
router.get("/", protect, getAll);
router.get("/:id", protect, getOne);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, remove);

module.exports = router;