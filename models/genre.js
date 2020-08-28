const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = new mongoose.Schema({
    name: {
      type:String,
      min: 5,
      max: 255,
      required: true
    },
});

const Genre = mongoose.model('Genre', Schema);

function validateGenre (data) {

  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(data);

}

exports.Genre = Genre;
exports.genreSchema = Schema;
exports.validate = validateGenre;
