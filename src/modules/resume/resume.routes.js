const express = require("express");
const router = express.Router();
const { get, upload, remove } = require("./resume.controller");
const { protect } = require("../../middlewares/auth.middleware");
const { uploadPDF } = require("../../middlewares/upload.middleware");

// Public route
router.get("/", get);

// Protected routes (admin only)
router.post("/", protect, uploadPDF, upload);
router.delete("/", protect, remove);

module.exports = router;