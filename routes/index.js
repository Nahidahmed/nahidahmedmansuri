const express = require('express');

const router = express.Router();
const blogpostRoute = require('./blogposts');
const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  router.get('/', (request, response, next) => {
    // if (!request.session.visitcount) {
    //   request.session.visitcount = 0;
    // }
    // request.session.visitcount += 1;
    try {
      return response.render('layout', { pageTitle: 'Welcome!', template: 'indexContent' });
    } catch (error) {
      return next(error);
    }
  });

  router.use('/blogposts', blogpostRoute());
  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
