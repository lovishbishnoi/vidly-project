const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/user');
const movies = require('../routes/movies');
const genre = require('../routes/genre');
const customer = require('../routes/customer');
const rentals = require('../routes/rentals');
const errorHandler = require('../middleware/error');

module.exports = function(app) {

  app.use(express.json());
  app.use('/api/v1.0/auth', auth);
  app.use('/api/v1.0/users', users);
  app.use('/api/v1.0/movies', movies);
  app.use('/api/v1.0/genre', genre);
  app.use('/api/v1.0/customer', customer);
  app.use('/api/v1.0/rentals', rentals);

  app.use(errorHandler);

}
