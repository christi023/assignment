import React, { useState, useEffect } from 'react';

import MovieApi from '../../MovieAPI';

function MovieService() {
  const [movies, setmovies] = useState(null);

  useEffect(() => {
    if (!movies) {
      getMovies();
    }
  });

  const getMovies = async () => {
    let res = await MovieApi.getMovies();
    console.log(res);
    setmovies(res);
  };

  const DEFAULT_PLACEHOLDER_IMAGE =
    'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

  const renderMovie = movie => {
    const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

    return (
      <>
        <li className="list__item movie">
          <h3 className="movie__title">{movie.title}</h3>
          <div>
            <img width="200" alt={`The movie titled: ${movie.Title}`} src={poster} />
          </div>
          <p key={movie._id} className="movie__description">
            {movie.description}
          </p>
          <p className="movie__length">{movie.length}</p>
          <p className="movie__year">{movie.year}</p>
          <p className="movie__genre">{movie.genre}</p>
          <p className="movie_poster">{movie.poster}</p>
          <p className="movie__hasSeen">{movie.hasSeen}</p>
          <p className="movie__isFavourite">{movie.isFavourite}</p>
        </li>
      </>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {movies && movies.length > 0 ? (
          movies.map(movie => renderMovie(movie))
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </div>
  );
}

export default MovieService;
