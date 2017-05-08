/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');

// create our app
const app = express();
const port = process.env.PORT || 3000; // for deploying to Heroku

// fix for redirecting https URL for Weather API
app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') { // x-forwarded-proto doesn't exist locally
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

// Handles all routes so you do not get a not found error
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, function() {
   console.log('Express server is up on port ' + port);
});
