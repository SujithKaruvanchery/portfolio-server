const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const projectRoutes = require("../modules/projects/project.routes");
const blogRoutes = require("../modules/blogs/blog.routes");
const skillRoutes = require("../modules/skills/skill.routes");
const contactRoutes = require("../modules/contact/contact.routes");
const resumeRoutes = require("../modules/resume/resume.routes");

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/skills", skillRoutes);
router.use("/contact", contactRoutes);
router.use("/resume", resumeRoutes);

module.exports = router;