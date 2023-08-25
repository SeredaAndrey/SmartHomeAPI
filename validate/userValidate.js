const Joi = require("joi");

const workUserValidate = Joi.object({
  password: Joi.string().min(5).max(16).required(),
  name: Joi.string().min(1).max(16).required(),
});

const patchUserValidate = Joi.object({
  name: Joi.string().min(1).max(16),
  inerfaceLanguage: Joi.string().valid("en", "ru", "ua"),
  fullName: Joi.string().min(1).max(16),
});

module.exports = { workUserValidate, patchUserValidate };
