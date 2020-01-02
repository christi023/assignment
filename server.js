//const Joi = require('joi');
const express = require('express');
const movies = require('./routes/movies');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//const handlebars = require('express-handlebars');

// load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();
//body parser adding middleware
app.use(express.json());

// Enable cors
app.use(cors());
/*app.set('views', path.join(__dirname, '/views'));
app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
  }),
);
app.set('view engine', 'hbs');*/

// Routes
app.use('/api/movies', movies, require('./routes/movies'));

app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// env variable port created
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
