const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  subject: Joi.string().min(2).max(100).required().messages({
    "any.required": "Subject is required",
  }),
  message: Joi.string().min(10).max(1000).required().messages({
    "any.required": "Message is required",
    "string.min": "Message must be at least 10 characters",
  }),
});

module.exports = { createContactSchema };