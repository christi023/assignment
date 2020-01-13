const mongoose = require('mongoose');
const Joi = require('joi');

//const Schema = mongoose.Schema;

// Created a User schema for our user info model
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
      isRequired: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 255,
      unique: true,
      isRequired: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 255,
      isRequired: true,
    },
  }),
);

// Function to validate our User info
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(4)
      .max(255)
      .required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;

// export the function
exports.validate = validateUser;
