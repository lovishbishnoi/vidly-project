const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    name: {
      type:String,
      trim: true,
      minlength: 5,
      maxlength: 255,
      required: true
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      default: false
    }
});

const Customer = mongoose.model('Customer', Schema);

function validateCustomer (data) {

    const schema = Joi.object({
      name: Joi.string().required(),
      phone: Joi.number().required(),
      isGold: Joi.boolean().required(),
    });

    return schema.validate(data);

}

exports.Customer = Customer;
exports.customerSchema = Schema;
exports.validate = validateCustomer;
