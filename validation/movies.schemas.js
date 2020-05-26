const Joi = require('@hapi/joi');

module.exports = {
  createForm: Joi.object({
    title: Joi.string().max(1000).required(),
    releaseYear: Joi.number().min(1800).max(2100).required(),
    format: Joi.string()
        .valid('VHS', 'DVD', 'Blu-Ray')
        .required(),
    stars: Joi.array().items(Joi.string().max(1000).required()).required(),
  }),

  paramsCheckForm: Joi.object({
    id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/),
  }),
};
