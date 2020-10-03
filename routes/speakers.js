const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    return response.json(speakers);
  });

  router.get('/:speaker', (request, response) => {
    return response.send(`Today's Speaker: ${request.params.speaker}`);
  });

  return router;
};
