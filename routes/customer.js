const express = require('express');
const routes = express.Router();

const { Customer, validate } = require('../models/customer');


routes.get('/', async (req, res) => {
  const customer = await Customer.find();
  if(!customer) return res.status(404).send("no data found for the request");

  res.send(customer);

});

routes.post('/', async (req, res) => {

  const {error} = validate(req.body);
  if(error) return res.status(400).send(error);

  let customer = new Customer ({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);

});

// routes.put('/:id', async (req, res) => {
//
//   try {
//
//     const {error} = validate(req.body);
//     if(error) return res.status(400).send(error);
//
//     const movie = await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title, stockQuantity: req.body.stockQuantity, dailyRentalRate: req.body.dailyRentalRate }, {new: true});
//     if(!movie) return res.status("404").send("Movie not available");
//
//     res.send(movie);
//
//   }
//   catch(ex) {
//     res.status(500).send(ex);
//   }
//
// });

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
