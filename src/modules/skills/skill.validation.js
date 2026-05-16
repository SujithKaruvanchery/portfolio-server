const Joi = require("joi");

const createSkillSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().messages({
    "any.required": "Skill name is required",
  }),
  category: Joi.string()
    .valid("frontend", "backend", "database", "devops", "tools", "other")
    .required()
    .messages({
      "any.required": "Category is required",
      "any.only": "Category must be one of: frontend, backend, database, devops, tools, other",
    }),
  proficiency: Joi.number().min(1).max(100).required().messages({
    "any.required": "Proficiency is required",
    "number.min": "Proficiency must be between 1 and 100",
    "number.max": "Proficiency must be between 1 and 100",
  }),
  icon: Joi.string().optional().allow(""),
});

const updateSkillSchema = Joi.object({
  name: Joi.string().min(1).max(50).optional(),
  category: Joi.string()
    .valid("frontend", "backend", "database", "devops", "tools", "other")
    .optional(),
  proficiency: Joi.number().min(1).max(100).optional(),
  icon: Joi.string().optional().allow(""),
});

module.exports = { createSkillSchema, updateSkillSchema };