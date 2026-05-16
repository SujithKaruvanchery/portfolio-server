const Joi = require("joi");

const resumeSchema = Joi.object({
  label: Joi.string().max(100).optional().allow(""),
});

module.exports = { resumeSchema };