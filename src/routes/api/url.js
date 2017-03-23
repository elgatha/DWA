// This is require URL
const url = require('../../models/url');
const shortUrl = require('../../modules/main_url');
const debug = require("../../modules/debug");


module.exports = (express) => {
  // This is the express router
  const router = express.Router();

  // This creates
  router.post('/url', (req, res) => {
    req.body.shortened_url = shortUrl.shortUrl();
    url.create(req.body, (err) => {
      res.status(500).json(err);
      debug.debug('The Debugging process has been activated!' + err, 'Error!' );
    }, (data) => {
      res.status(200).json(data);
      debug.debug('Yay! The shortened URL has been successfully created.' , 'yup, this was successful');
    });
  });

  // This GETs All
  router.get('/url', (req, res) => {
       url.findAll((err) => {
           res.status(500).json(err);
           debug.debug('Not your day today! WHY? None of the  URLs were successfully read because of the following errors: ' + err, 'Error! ');
       }, (data) => {
           res.status(200).json(data);
           debug.debug('You are on point today! ALL The URLs were successfully read.', 'yup, this was successful');
       })
   });

  // This GETs by ID
  router.get('/url/:id', (req, res) => {
       req.body.id = req.params.id;
       url.find(req.body, (err) => {
           res.status(500).json(err);
           debug.debug('I hate to be the bearer of bad news, but, we did not read the url because of the following errors: ' + err, 'Error! ');
       }, (data) => {
           res.status(200).json(data);
           debug.debug('Whoopie! The URL has been successfully read by the id.', 'yup, this was successful');
       })
   });

  // This updates
  router.post('/url/:id', (req, res) => {
        req.body.id = req.params.id;
        url.update(req.body, (err) => {
            res.status(500).json(err);
            debug.debug('Nope, try again! The URL you are trying to delete was not successfully deleted because of these errors: ' + err, 'Error! ');
        }, (data) => {
            res.status(200).json(data);
            debug.debug('Boom! The URL has been successfully updated.', 'yup, this was successful');
        })
    });

  // This deletes
  router.delete('/url/:id', (req, res) => {
        req.body.id = req.params.id;
        url.destroy(req.body, (err) => {
            res.status(500).json(err);
            debug.debug('Nuh, huh! The URL you are trying to delete was not successfully deleted because of these errors: ' + err, 'Error! ');
        }, (data) => {
            res.status(200).json(data);
            debug.debug('You rock! The URL has been successfully deleted.', 'yup, this was successful');
        })
    });

  // This returns
  return router;
};
