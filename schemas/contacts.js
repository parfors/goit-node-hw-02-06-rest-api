const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(4).required(),
});

const putSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(4),
}).min(1);

module.exports = {
  addSchema,
  putSchema,
};
