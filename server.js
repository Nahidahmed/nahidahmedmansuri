const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const app = express();

const port = 3050;
const createError = require('http-errors');

const routes = require('./routes');

const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');
const AchievementService = require('./services/AchievementService');

const speakerService = new SpeakerService('./data/speakers.json');
const feedbackService = new FeedbackService('./data/feedback.json');
const achievementService = new AchievementService('./data/achievements.json');

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['ts09eh5675', 'ap09bj0865'],
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Global variables
app.locals.siteName = 'Nahid Ahmed Mansuri';

app.use(express.static(path.join(__dirname, './static')));

// Local Variables
app.use(async (request, response, next) => {
  try {
    response.locals.someVariable = 'PMP';
    const achievements = await achievementService.getAchievements();
    response.locals.keyachievements = achievements;
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  '/',
  routes({
    speakerService,
    feedbackService,
    achievementService,
  })
);

// The below error handling middle should always be at the bottom of the file so
// it confirms that all middlewares are tried and finally throwing the error
app.use((request, response, next) => {
  return next(createError(404, 'Page not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
  return next();
});

app.listen(port, () => {
  console.log(`Express server listening on port: ${port}`);
});
