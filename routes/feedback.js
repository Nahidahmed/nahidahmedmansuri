const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();
      return response.json(feedbacks);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', (request, response) => {
    return response.send('Feedback form posted!');
  });

  return router;
};
