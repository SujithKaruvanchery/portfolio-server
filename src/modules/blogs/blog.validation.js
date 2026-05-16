const Joi = require("joi");

const createBlogSchema = Joi.object({
  title: Joi.string().min(2).max(200).required().messages({
    "any.required": "Title is required",
  }),
  content: Joi.string().min(10).required().messages({
    "any.required": "Content is required",
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  published: Joi.boolean().optional(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().min(2).max(200).optional(),
  content: Joi.string().min(10).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  published: Joi.boolean().optional(),
});

module.exports = { createBlogSchema, updateBlogSchema };