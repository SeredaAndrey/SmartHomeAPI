const Joi = require("joi");

const createRoomValidate = Joi.object({
  name: Joi.string().min(1).max(16).required(),
  flor: Joi.string().min(1).max(16),
});

const patchRoomValidate = Joi.object({
  name: Joi.string().min(1).max(16),
  flor: Joi.string().min(1).max(16),
});

module.exports = { createRoomValidate, patchRoomValidate };
