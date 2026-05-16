const Joi = require("joi");

const createProjectSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "any.required": "Title is required",
  }),
  description: Joi.string().min(10).required().messages({
    "any.required": "Description is required",
  }),
  techStack: Joi.array().items(Joi.string()).min(1).required().messages({
    "any.required": "Tech stack is required",
  }),
  liveUrl: Joi.string().uri().optional().allow(""),
  githubUrl: Joi.string().uri().optional().allow(""),
  featured: Joi.boolean().optional(),
});

const updateProjectSchema = Joi.object({
  title: Joi.string().min(2).max(100).optional(),
  description: Joi.string().min(10).optional(),
  techStack: Joi.array().items(Joi.string()).min(1).optional(),
  liveUrl: Joi.string().uri().optional().allow(""),
  githubUrl: Joi.string().uri().optional().allow(""),
  featured: Joi.boolean().optional(),
});

module.exports = { createProjectSchema, updateProjectSchema };