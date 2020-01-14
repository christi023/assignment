import React, { useReducer, useEffect } from 'react';
//import ReactDOM from "react-dom";
import Header from '../Header/Header';
import MovieSearch from '../MovieSearch/MoviesSearch';
import MovieList from '../MovieList/MovieList';

//import './styles.css';
//import { baseURL, api } from '../../utils/api';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

function Movie() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search,
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({ type: 'SEARCH_MOVIES_REQUEST' });
    fetch(`https:///www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search,
          });
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="Hooked" />
      <MovieSearch search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => <MovieList key={`${index}-${movie.Title}`} movie={movie} />)
        )}
      </div>
    </div>
  );
}
export default Movie;
/*import React, { Component } from 'react';
import axios from 'axios';

const imgUrl = 'http://image.tmdb.org/t/p/w185/';
export default class Movie extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      isLoading: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let query = this.input.value;
    console.log(query);
    this.componentDidMount(query);
  }

  // Let's our app know we're ready to render the data
  componentDidMount(query) {
    let api =
      'https://api.themoviedb.org/3/movie/550?api_key=c12f15df0469c213fe44866c12783311&query=';
    axios.get(api + query).then(response =>
      this.setState({
        movies: response.data.results,
      }),
    );
  }

  /*getMovies() {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=c12f15df0469c213fe44866c12783311')
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        this.setState({
          movies: response.data.movies,
          isLoading: false,
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({ error, isLoading: false }));
  }*/

/*render() {
    const { movies } = this.state;
    let movieList =
      movies && movies.length > 0 ? (
        movies.map(movie => (
          <div className="col-4 movie">
            <img src={imgUrl + movie.poster_path} className="movieImg" alt="" />
            <p className="overview">{movie.overview}</p>
            <h3 key={movie.id} className="text-center movieTitle">
              {movie.title}
            </h3>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      );
    return (
      <div className="App">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <h2 className="col-12 text-center">Search for a Movie</h2>
              <form onSubmit={this.onSubmit} className="col-12">
                <input
                  className="col-12 form-control"
                  placeholder="Search Movies..."
                  ref={input => (this.input = input)}
                />
              </form>
              <div>
                <ul className="col-12 row">{movieList}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}*/

/*const { movies } = this.state;

    movies && movies.length > 0 ? (
      movies.map(movie => (
        <div>
          <div className="col-4 movie">
            <img className="movieImg" alt="img" />
            <p className="overview">{movie.overview}</p>
            <h3 key={movie.id} className="text-center movieTitle">
              {movie.title}
            </h3>

            <h3 className="runtime">{movie.runtime}</h3>
            <h3 className="release_date">{movie.release_date}</h3>
            <h3 className="genres.name">{movie.genres_name}</h3>
            <h3 className="poster_path">{movie.poster_path}</h3>
          </div>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <div className="App">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <h2 className="col-12 text-center">Search Movie Here</h2>
              <form onSubmit={this.onSubmit} className="col-12">
                <input
                  className="col-12 form-control"
                  placeholder="Search Movies...."
                  ref={input => (this.input = input)}
                />
              </form>
              <div>
                <ul> {movie}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }*/

//const API_URL = 'https://api.themoviedb.org/3/';
//const API_KEY = '844dba0bfd8f3a4f3799f6130ef9e335';

//import Search from '../Search/Search';
/*import axios from 'axios';
import './Movie.css';

export default class App extends Component {
  // State will apply to the posts object which is set to loading by default
  state = {
    movies: [],
    isLoading: true,
    errors: null,
  };
  // Now we're going to make a request for data using axios
  getMovies() {
    axios
      // This is where the data is hosted
      .get('http://www.omdbapi.com/?apikey=367da9d9') // REPLACE WITH YOUR OWN
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        this.setState({
          movies: response.data.movies,
          isLoading: false,
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({ error, isLoading: false }));
  }
  // Let's our app know we're ready to render the data
  componentDidMount() {
    this.getMovies();
  }

  // Putting that data to use
  render() {
    const { movies } = this.state;
    return (
      <>
        <div>
          {//!isLoading ?
          movies && movies.length > 0 ? (
            movies.map(movie => {
              const { _id, title, description, length, year, genre, poster } = movie;

              return (
                <div key={_id}>
                  <h3 className="title">{title}</h3>
                  <p className="description">{description}</p>
                  <p className="length">{length}</p>
                  <p className="year">{year}</p>
                  <p className="genre">{genre}</p>
                  <p className="poster">{poster}</p>
                  <p className="movie__hasSeen">{movie.hasSeen}</p>
                  <p className="movie__isFavourite">{movie.isFavourite}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p></p>
          )}
        </div>
      </>
    );
  }
}*/
