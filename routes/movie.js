const express = require('express');
const movieRouter = express.Router();
const Movie = require('../model/Movie');

//xml convert
const convert = require('xml-js');
let fs = require('fs').readFileSync('./movies.xml', 'utf8');
let result = convert.xml2json(fs, { compact: true, spaces: 4 });
result = JSON.parse(result);

// CRUD OPERATIONS

// Read -> getting all movies
movieRouter.get('/', (req, res) => {
  Movie.find({}, (err, response) => {
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
  const movie = new Movie(req.body);
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
  Movie.findByIdAndDelete(req.params.id, err => {
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
  Movie.findOneAndUpdate(
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
