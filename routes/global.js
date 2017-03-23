// This require for models/url

var url = require('../models/url');

// This exports express
module.exports = (express) => {
  var router = express.Router();

  // This is a router
  router.get('/', (req, res) => {
    res.json({ main: 'hit' });
  });
//shortUrl
  router.get('/go/:shortenedUrl', (req, res) => {
      var request = req;
      var response = res;
      request.body.shortenedUrl = request.params.shortenedUrl;
      url.findShortURL(request.body, (err) => {
        response.status(500).json(err);
      }, (data) => {
        // This redirects to the original url
        response.redirect(data.first_url);
      });
    });

  router.use('/api/v1', require('./api/url')(express));

    // This returns the express router

  return router;
};
