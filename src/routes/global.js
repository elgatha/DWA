// This require for models/url

const url = require('../models/url');

// This requires modules/debug
const debug = require("../modules/debug");


// This exports express
module.exports = (express) => {
  const router = express.Router();

  // These are routers
  router.get('/', (req, res) => {
    res.json({ main: 'hit' });
    debug.debug("The main route responded with success.", 'yup, this was successful');
  });

  router.get('/status', (req, res) => {
    res.json({ Healthy: true });
    debug.debug("The status route responded with success", 'yup, this was successful');
  });

//shortUrl
  router.get('/go/:shortenedUrl', (req, res) => {
      const request = req;
      const response = res;
      request.body.shortenedUrl = request.params.shortenedUrl;
      url.findShortURL(request.body, (err) => {
        response.status(500).json(err);
        debug.debug("Oops! Something is wrong. Could not redirect because there are errors " + err, 'Error! ');
      }, (data) => {
        // This redirects to the original url
        response.redirect(data.first_url);
        debug.debug("The redirect was successful", 'yup, this was successful');

      });
    });

  router.use('/api/v1', require('./api/url')(express));

    // This returns the express router

  return router;
};
