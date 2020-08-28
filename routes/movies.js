const _ = require('lodash');
const express = require('express');
const routes = express.Router();

const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genre');


routes.get('/', async (req, res) => {

  const movies = await Movie.find();
  if(!movies) return res.status(404).send("no data found for the request");

  res.send(movies);

});

routes.post('/', async (req, res) => {

  const {error} = validate(req.body);
  if(error) return res.status(400).send(error);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(404).send("Given genre does not exist, try another or add new");

  let movie = new Movie ({
    title: req.body.title,
    genre: {
      id: genre._id,
      name: genre.name
    },
    stockQuantity: req.body.stockQuantity,
    dailyRentalRate: req.body.dailyRentalRate
  });

  movie = await movie.save();
  res.send(movie);

});

routes.put('/:id', async (req, res) => {

  try {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);

    const movie = await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title, stockQuantity: req.body.stockQuantity, dailyRentalRate: req.body.dailyRentalRate }, {new: true});
    if(!movie) return res.status("404").send("Movie not available");

    res.send(movie);

  }
  catch(ex) {
    res.status(500).send(ex);
  }

});

routes.get('/:id', async(req, res) => {

  try {

    const movie = await Movie.findById(req.params.id);
    if(!movie) { res.status("404").send("Movie not available") }
    res.send(movie);

  }
  catch(ex) {
    res.status(500).send(ex);
  }

});

// routes.delete('/:id', async(req, res) => {
//
//   try {
//
//     const movie = await Movie.findById(req.params.id);
//     if(!movie) { res.status("404").send("Movie not available") }
//
//
//     res.send(movie);
//
//   }
//   catch(ex) {
//     res.status(500).send(ex);
//   }
//
// });

module.exports = routes;
