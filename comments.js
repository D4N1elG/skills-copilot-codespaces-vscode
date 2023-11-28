// Create web server application ...

// Import the express module
var express = require('express');

// Create an express application
var app = express();

// Import the body-parser module
var bodyParser = require('body-parser');

// Import the path module
var path = require('path');

// Import the fs module
var fs = require('fs');

// Import the comments module
var comments = require('./comments');

// Configure the express application to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the express application to serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// Create a GET handler for the "/comments" path
app.get('/comments', function(req, res) {

  // Read the comments from the comments.json file
  fs.readFile('comments.json', function(err, data) {

    // If an error occurs, send an empty array
    if (err) {
      res.json([]);
      return;
    }

    // Otherwise, send the data read from the file
    res.json(JSON.parse(data));
  });
});

// Create a POST handler for the "/comments" path
app.post('/comments', function(req, res) {

  // Read the comments from the comments.json file
  fs.readFile('comments.json', function(err, data) {

    // If an error occurs, send an empty array
    if (err) {
      res.json([]);
      return;
    }

    // Otherwise, parse the JSON data read from the file
    var comments = JSON.parse(data);

    // Add the comment from the request body
    comments.push(req.body);

    // Write the comments back to the file
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {

      // If an error occurs, send an empty array
      if (err) {
        res.json([]);
        return;
      }

      // Otherwise, send the updated list of comments
      res.json(comments);
    });
  });
});

// Start the web server on port 8080
app.listen(8080);
