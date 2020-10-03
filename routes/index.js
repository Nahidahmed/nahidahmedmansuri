const express = require('express');

const router = express.Router();
const blogpostRoute = require('./blogposts');
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  router.get('/', (request, response) => {
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;

    response.render('layout', { pageTitle: 'Welcome!', template: 'indexContent' });
  });

  router.use('/blogposts', blogpostRoute());
  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
