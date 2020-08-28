const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const routes = express.Router();
const Joi = require('@hapi/joi');

const { Genre, validate } = require('../models/genre');


routes.get('/', async(req, res) => {
  
  const genre = await Genre.find();
  if(!genre) return res.status(404).send("No data found for the request");

  res.send(genre);

});

routes.post('/', auth, async (req, res) => {

  const {error} = validate(req.body);
  if(error) return res.status(400).send(error);

  let genre = new Genre ({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);

});

routes.put('/:id', async (req, res) => {

  try {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {new: true});
    if(!genre) return res.status("404").send("Genre not available");

    res.send(genre);

  }
  catch(ex) {
    res.status(500).send(ex);
  }

});

routes.get('/:id', async(req, res) => {

    const genre = await Genre.findById(req.params.id);
    if(!genre) { res.status("404").send("Genre not available") }
    res.send(movie);
});

routes.delete('/:id', [auth, admin], async(req, res) => {

  try {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) { res.status("404").send("Genre with given id is not available.") }


    res.send(genre);

  }
  catch(ex) {
    res.status(500).send(ex);
  }

});

module.exports = routes;
