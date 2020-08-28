const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    title: {
      type:String,
      trim: true,
      minlength: 5,
      maxlength: 255,
      required: true
    },
    genre: {
      type: genreSchema,
      required: true
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max:255
    }
});

const Movie = mongoose.model('Movie', Schema);

function validateMovie (data) {

    const schema = Joi.object({
        title: Joi.string().required(),
        genreId: Joi.objectId().required(),
        stockQuantity: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    });

    return schema.validate(data);

}

exports.Movie = Movie;
exports.movieSchema = Schema;
exports.validate = validateMovie;
