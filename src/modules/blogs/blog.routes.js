const express = require("express");
const router = express.Router();
const {
  getAll,
  getBySlug,
  getById,
  create,
  update,
  remove,
} = require("./blog.controller");
const { protect } = require("../../middlewares/auth.middleware");
const { uploadImage } = require("../../middlewares/upload.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createBlogSchema, updateBlogSchema } = require("./blog.validation");

// Public routes
router.get("/", getAll);
router.get("/slug/:slug", getBySlug);

// Protected routes (admin only)
router.get("/:id", protect, getById);
router.post("/", protect, uploadImage("blogs"), validate(createBlogSchema), create);
router.put("/:id", protect, uploadImage("blogs"), validate(updateBlogSchema), update);
router.delete("/:id", protect, remove);

module.exports = router;