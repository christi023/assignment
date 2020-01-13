const mongoose = require('mongoose');
//const api = require('../utils/api');
const Schema = mongoose.Schema;

// Created a Movie schema for our movie info model
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
  poster: {
    type: String,
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
/*module.exports.getCompanies = function(callback, limit){
  Company.find(callback).limit(limit);
  }
  */
