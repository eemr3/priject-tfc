import Joi = require('joi');

class JoiSchemas {
  user = Joi.object().keys({
    username: Joi.string().min(8).empty(),
    role: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    //   .messages({
    //   'string.min': '"password" length must be 6 characters long',
    // }),
  });

  login = Joi.object().keys({
    email: Joi.string().email().empty().required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
    password: Joi.string().min(6).empty().required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
  });
}

export default JoiSchemas;
