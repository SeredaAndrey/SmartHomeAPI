const Joi = require("joi");

const createSensorValidate = Joi.object({
  name: Joi.string().min(1).max(16).required(),
  type: Joi.string()
    .allow("temperature", "humidity", "illumination")
    .required(),
});

const patchSensorValidate = Joi.object({
  name: Joi.string().min(1).max(16),
  type: Joi.string().allow("temperature", "humidity", "illumination"),
});

module.exports = { createSensorValidate, patchSensorValidate };
