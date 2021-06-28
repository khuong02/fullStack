const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    rf_password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const resetValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    rf_password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const uploadProductValidation = (data) => {
  const schema = Joi.object({
    species: Joi.string().required(),
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

const uploadValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    species: Joi.string().required(),
    nameProduct: Joi.string().required(),
    imageProduct: Joi.string().required(),
    cloudinary: Joi.string().required(),
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = Joi.object({
    species: Joi.string().required(),
    nameProduct: Joi.string().required(),
    cloudinaryNew: Joi.string(),
    image: Joi.string(),
    oldCloudinary: Joi.string(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;

module.exports.resetValidation = resetValidation;

module.exports.uploadProductValidation = uploadProductValidation;

module.exports.uploadValidation = uploadValidation;

module.exports.updateValidation = updateValidation;
