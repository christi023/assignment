const express = require('express');
const {
  getMovies,
  // addMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
} = require('../controllers/movies');

const router = express.Router();

router
  .route('/')
  .get(getMovies)
  .get(getMovieById)
  //.post(addMovies)
  .post(createMovie)
  .delete(deleteMovie)
  .put(updateMovie);

module.exports = router;
