const Movie = require('../model/Movie');

// xml convert
const convert = require('xml-js');
let fs = require('fs').readFileSync('./movies.xml', 'utf8');
let result = convert.xml2json(fs, { compact: true, spaces: 4 });
result = JSON.parse(result);

//console.log(result);

// Get all movies
// Get all api/movies
// Access Public

exports.getMovies = async (req, res, next) => {
  try {
    // get movies from database
    const movie = await Movie.find();

    return res.status(200).json({
      result, //movies
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create movies
// Post /api/movies
// Access Public

// add xml file
/*exports.addMovies = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This movie already exists' }); // user err for duplicate fields
    }
    res.status(500).json({ error: 'Server error' });
  }
};*/

// create movie

exports.createMovie = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a movie',
    });
  }

  const movie = new Movie(body);

  if (!movie) {
    return res.status(400).json({ success: false, error: err });
  }

  movie
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: movie._id,
        message: 'Movie created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Movie not created!',
      });
    });
};

// update movie
exports.updateMovie = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Movie not found!',
      });
    }
    movie.title = body.title;
    movie.description = body.description;
    movie.length = body.length;
    movie.year = body.year;
    movie.genre = body.genre;
    movie.hasSeen = body.hasSeen;
    movie.isFavourite = body.isFavourite;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie._id,
          message: 'Movie updated!',
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Movie not updated!',
        });
      });
  });
};

// delete movie
exports.deleteMovie = async (req, res) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }

    return res.status(200).json({ success: true, data: movie });
  }).catch(err => console.log(err));
};

// get 1 movie
exports.getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    return res.status(200).json({ success: true, data: movie });
  }).catch(err => console.log(err));
};
