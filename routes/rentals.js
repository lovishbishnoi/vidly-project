const express = require('express');
const routes = express.Router();

const { Rentals, validate } = require('../models/rentals');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose);

routes.get('/', async (req, res) => {
  const rentals = await Customer.find().sort('-dateOut');
  if(!rentals) return res.status(404).send("no data found for the request");

  res.send(rentals);

});

routes.post('/', async (req, res) => {

  const {error} = validate(req.body);
  if(error) return res.status(400).send(error);

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(404).send("No Customers found by the ID");

  const movie = await Movie.findById(req.body.movieId);
  if(!movie) return res.status(404).send("No Movies found, please choose another ID");

  if(movie.stockQuantity === 0) return res.status(400).send("Movie out of stock choose another.");

  let rental = new Rentals ({
    customer: customer,
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },

  });

  try{
    new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id }, {
          $inc: {stockQuantity: -1}
        })
        .run();

      res.send(rental);
  }
  catch(ex) {
    res.status(500).send("Something went wrong");
  }


});

routes.get('/:id', async(req, res) => {

  try {

    const customer = await Customer.findById(req.params.id);
    if(!customer) { res.status("404").send("Customer not found") }
    res.send(customer);

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
