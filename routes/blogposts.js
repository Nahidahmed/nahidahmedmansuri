const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('List of Blogs');
  });

  router.get('/:blogtitle', (request, response) => {
    return response.send(`Today's Blog Topic: ${request.params.blogtitle}`);
  });

  return router;
};
