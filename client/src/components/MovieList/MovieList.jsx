import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../../utils/api';
// import styles
import './MovieList.css';

const MovieList = () => {
  const [movie, setMovie] = useState({});

  let movieId = sessionStorage.getItem('movieId');

  useEffect(() => {
    getMovie(movieId);
  }, []);

  // getting movie with details
  const getMovie = async id => {
    const response = await axios.get(`https://www.omdbapi.com/?i=${id}&${API}`); // USE your api key here
    const movieDetails = response.data;
    setMovie(movieDetails);
  };

  return (
    <div className="movie-page">
      <h1>{movie.Title}</h1>
      <div className="movie-content">
        <div className="poster">
          <img src={movie.Poster} alt="" />
          <a href={`http://imdb.com/title/${movieId}`} target="_blank">
            View IMDB
          </a>
          <Link to="/movie">Back</Link>
        </div>
        <div>
          <p>
            <strong>Title: </strong>
            {movie.Title}
          </p>
          <p>
            <strong>Year: </strong>
            {movie.Year}
          </p>

          <p>
            <strong>Runtime: </strong>
            {movie.Runtime}
          </p>
          <p>
            <strong>Released: </strong>
            {movie.Released}
          </p>
          <p>
            <strong>Genre: </strong>
            {movie.Genre}
          </p>

          <p>
            <strong>Actors: </strong>
            {movie.Actors}
          </p>
          <p>
            <strong>Plot: </strong>
            {movie.Plot}
          </p>

          <p>
            <strong>Awards: </strong>
            {movie.Awards}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
