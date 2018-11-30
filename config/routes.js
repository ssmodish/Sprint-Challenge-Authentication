require('dotenv').config();

const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');

const { authenticate } = require('./middlewares');

const jwtKey = require('../_secrets/keys').jwtKey;
const db = require('../database/dbConfig.js');


function generateToken(user) {
  console.log('generating token');
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = jwtKey;
  const options = {
    expiresIn: '1h',
  };
  console.log(payload, secret, options);

  return jwt.sign(payload, secret, options);
}


module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);

  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.ststus(400).json(err);
    });
}

function login(req, res) {
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(creds.password, user.password)) {
        console.log(user)
        const token = generateToken(user);
        console.log(token);
        res.status(200).json({ message: 'Success!', token });
      } else {
        res.status(401).json({ message: 'nope' });
      }
    })
    .catch( err => res.json(err));
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
