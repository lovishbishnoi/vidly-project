const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    name: {
      type:String,
      trim: true,
      minlength: 5,
      maxlength: 50,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('Users', userSchema);

function validateUser (data) {

    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(data);

}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
