const mongoose = require('mongoose');
//const api = require('../utils/api');
const Schema = mongoose.Schema;

// Movie Schema
const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  length: {
    type: Number,
  },
  year: {
    type: Number,
  },
  genre: {
    type: String,
    required: true,
  },
  hasSeen: {
    type: Boolean,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    required: true,
  },
});

/*const movie = new MovieModel({
  title: '',
  description: '',
  length: '',
  year: '',
  genre: '',
  hasSeen: '',
  isFavourite: '',
});
movie.save();*/

module.exports = mongoose.model('Movie', MovieSchema);
