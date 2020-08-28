const Joi = require('@hapi/joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const routes = express.Router();
const { User } = require('../models/auth/users');

routes.post('/', async (req, res) => {

  const {error} = validateLogin(req.body);
  if(error) return res.status(400).send(error);

  let user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send( token );

});


function validateLogin (req) {

    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(req);

}


module.exports = routes;
