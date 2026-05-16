const express = require("express");
const router = express.Router();
const {
  getAll,
  getByCategory,
  getOne,
  create,
  update,
  remove,
} = require("./skill.controller");
const { protect } = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createSkillSchema, updateSkillSchema } = require("./skill.validation");

// Public routes
router.get("/", getAll);
router.get("/category/:category", getByCategory);
router.get("/:id", getOne);

// Protected routes (admin only)
router.post("/", protect, validate(createSkillSchema), create);
router.put("/:id", protect, validate(updateSkillSchema), update);
router.delete("/:id", protect, remove);

module.exports = router;