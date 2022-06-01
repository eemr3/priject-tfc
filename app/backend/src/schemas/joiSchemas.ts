import Joi = require('joi');

class JoiSchemas {
  user = Joi.object().keys({
    username: Joi.string().min(8).empty(),
    role: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be 6 characters long',
    }),
  });

  login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  validateCategory = Joi.object({
    name: Joi.string().required(),
  });

  validatePost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  });

  validateUpdatePost = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()),
  });
}

export default JoiSchemas;
