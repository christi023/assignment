const express = require('express');
const movieRouter = express.Router();
const Moviedb = require('../model/Moviedb');
// CRUD OPERATIONS

movieRouter.post(function(req, res, next) {
  const params = req.body.params;
  request({
    uri: ' http://www.omdbapi.com/?i=tt3896198&apikey=37b11c7',
    qs: {
      api_key: '37b11c7',
    },
  }).pipe(res);
});

// Read -> getting all movies
movieRouter.get('/', (req, res) => {
  Moviedb.find({}, (err, response) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: 'Unable to get movies',
          msgError: true,
        },
      });
    else res.status(200).json(response);
  });
});

// Create -> Post request
movieRouter.post('/', (req, res) => {
  const movie = new Moviedb(req.body);
  movie.save((err, document) => {
    // saving to database
    if (err)
      res.status(500).json({
        message: {
          msgBody: 'Unable to add a  movie',
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: 'Successfully Added Movie',
          msgError: false, // since everything went well
        },
      });
  });
});

// Delete -> Deleting a movie
movieRouter.delete('/:id', (req, res) => {
  Moviedb.findByIdAndDelete(req.params.id, err => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: 'Unable to Delete Movie',
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: 'Successfully Deleted Movie',
          msgError: false, // since everything went well
        },
      });
  });
});

// Update - use runValidators for updating because by default mongoose don't run validators for updates
movieRouter.put('/:id', (req, res) => {
  Moviedb.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true },
    (err, response) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: 'Unable to Update Movie',
            msgError: true,
          },
        });
      else
        res.status(200).json({
          message: {
            msgBody: 'Successfully Updated Movie',
            msgError: false, // since everything went well
          },
        });
    },
  );
});

module.exports = movieRouter;
