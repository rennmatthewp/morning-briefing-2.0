const express = require('express');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const router = express.Router();

router.get('/users', (request, response) => {
  database('users')
    .then(users => response.status(200).json(users))
    .catch(error => response.status(500).json({ error }));
});

router.get('/users/:id', (request, response) => {
  const { id } = request.params;
  database('users')
    .where('id', id)
    .then(user => {
      if (!user[0]) {
        return response
          .status(404)
          .json({ error: `Could not find user with id: ${id}.` });
      }
      return response.status(200).json(user[0]);
    })
    .catch(error => response.status(500).json(error));
});

router.post('/users', (request, response) => {
  const user = request.body;

  for (const requiredParameter of ['email', 'firstName', 'lastName']) {
    if (!user[requiredParameter]) {
      return response
        .status(422)
        .json({
          error: `Expected format: { email: <String>, firstName: <String>, lastName: <String>. Missing required property: ${requiredParameter}.`
        });
    }
  }

  return database('users')
    .insert(user, 'id')
    .then(result => response.status(201).json({ id: result[0] }))
    .catch(error => response.status(500).json(error));
});

module.exports = { router, database };
