const express = require('express');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const router = express.Router();

router.get('/users', (request, response) => {
  return response.status(200).json('hello world')
})

module.exports = { router, database };
