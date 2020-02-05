const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const movie = require('./routes/movie');
const users = require('./routes/users');
const auth = require('./routes/auth');
const moviedb = require('./routes/moviedb');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('config');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

if (!config.get('jwtSecret')) {
  console.error('FATAL ERROR: Key is not valid.');
  process.exit(1);
}

// Connect to database
connectDB();

const app = express();
//body parser adding middleware
app.use(express.json());

/*app.get('/', function(req, res) {
  res.json({ movies: 'Build your movie list' });
});*/

/*app.get('/', function(req, res) {
  res.json({ moviedbs: 'Build your movie list' });
});*/

// Enable cors
app.use(cors());

// Routes and required routes

app.use('/api/movie', movie);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/moviedb', moviedb);

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// env variable port created
const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
