const mongoose = require('mongoose');
//const api = require('../utils/api');
const Schema = mongoose.Schema;

// Created a Movie schema for our movie info model
const MoviedbSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
  },
  Genre: {
    type: String,
  },
  Actors: {
    type: String,
  },
  Plot: {
    type: String,
    required: true,
  },
  Awards: {
    type: String,
  },
  Poster: {
    type: String,
  },
});

module.exports = mongoose.model('Moviedb', MoviedbSchema);
