const Joi = require('joi');

const authValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
  role: Joi.string().valid('DRIVER', 'SHIPPER').optional(),
});

module.exports = {
  authValidation,
};
