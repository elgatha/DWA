// These are dependecies
var express = require('express');
var bodyParser = require('body-parser');
var debug = require("./modules/debug");

// This is express
var app = express();

//This is the port
var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// This is routes
app.use('/', require('./routes/global.js')(express));

// This is the configuration for the server to listen to the port
var server = app.listen(port, () => {
 console.log('Server Active on', port);
 if (process.env.DEBUG) {
     debug.debug('It is about to Debug!', 'yup, this was successful');
 }
});

//This exports to server

module.exports = server;
