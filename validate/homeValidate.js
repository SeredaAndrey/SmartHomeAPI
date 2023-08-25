const Joi = require("joi");

const createHomeValidate = Joi.object({
  name: Joi.string().min(1).max(16).required(),
  adressCountry: Joi.string().min(1).max(16),
  adressCity: Joi.string().min(1).max(16),
  adressStreet: Joi.string().min(1).max(16),
  adressHomeNumber: Joi.string().min(1).max(16),
  adressApartamentNumber: Joi.string().min(1).max(16),
});

const patchHomeValidate = Joi.object({
  name: Joi.string().min(1).max(16),
  adressCountry: Joi.string().min(1).max(16),
  adressCity: Joi.string().min(1).max(16),
  adressStreet: Joi.string().min(1).max(16),
  adressHomeNumber: Joi.string().min(1).max(16),
  adressApartamentNumber: Joi.string().min(1).max(16),
});

module.exports = { createHomeValidate, patchHomeValidate };
