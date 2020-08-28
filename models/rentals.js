const mongoose = require('mongoose');
const {movieSchema} = require('./movies');
const {customerSchema} = require('./customer');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    customer: {
      type: customerSchema,
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type:String,
          trim: true,
          minlength: 5,
          maxlength: 255,
          required: true
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max:255
        }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required:true,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
});

const Rentals = mongoose.model('Rentals', Schema);

function validateRentals (data) {

    const schema = Joi.object({
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required()
    });

    return schema.validate(data);

}

exports.Rentals = Rentals;
exports.validate = validateRentals;
