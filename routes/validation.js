const Joi = require('@hapi/joi');

//rgstr validatn
const registerValidation = data =>{
const schema = {
    name: Joi.string()
    .min(6)
    .required(),
    email: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required(),
    mobile: Joi.string()
    .min(10)
    .required(),
    gender: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    address: Joi.string().required(),
};
  return Joi.validate(data, schema );
};
   

const loginValidation = data =>{
    const schema = {
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    };
      return Joi.validate(data, schema );
    };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;