const express = require("express");
const router = express.Router();
const {
  getAll,
  getFeatured,
  getOne,
  create,
  update,
  remove,
} = require("./project.controller");
const { protect } = require("../../middlewares/auth.middleware");
const { uploadImage } = require("../../middlewares/upload.middleware");
const validate = require("../../middlewares/validate.middleware");
const {
  createProjectSchema,
  updateProjectSchema,
} = require("./project.validation");

// Public routes
router.get("/", getAll);
router.get("/featured", getFeatured);
router.get("/:id", getOne);

// Protected routes (admin only)
router.post("/", protect, uploadImage("projects"), create);
router.put("/:id", protect, uploadImage("projects"), update);
router.delete("/:id", protect, remove);

module.exports = router;