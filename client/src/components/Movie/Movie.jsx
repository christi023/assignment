import React, { useState, useEffect } from 'react';
import MovieSearch from '../MovieSearch/MoviesSearch';
import { API } from '../../utils/api';
import axios from 'axios';
// styles
import './Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    //Request Api for movies
    sessionStorage.setItem('movie', search);
    getMovies();
  };

  const getMovies = async () => {
    const movieName = sessionStorage.getItem('movie');
    if (movieName) {
      const response = await axios.get(`https://www.omdbapi.com/?s=${movieName}&${API}`); // place your api key here
      const movies = response.data;
      setMovies(movies.Search);
    }
  };

  return (
    <div>
      <div className="App1">
        <div className="jumbotron">
          <div className="container">
            <div className="row">
              <h2 className="col-12 text-center">Search Movie Here</h2>
              <form className="search-form" onSubmit={handleSubmit}>
                <input
                  className="search-bar"
                  type="text"
                  placeholder="Search For Movies"
                  value={search}
                  onChange={handleSearch}
                />
                <button className="search-button" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="movies-list">
        {movies.map((movie, index) => (
          <MovieSearch key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movie;

/*export default class Movie extends Component {
  constructor() {
    super();

    this.state = {
      currentInput: '',
      movieData: [], // 3
    };

    // bind methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ currentInput: event.target.value }); //2
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchingMovies(this.state.currentInput);
  }

  // fetch movies
  fetchingMovies(movie) {
    console.log('Fetching Movies ' + movie);

    const url = `https://www.omdbapi.com/?s=${movie}apikey=df61b4a5`;

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ movieData: data.Search }));
  }

  render() {
    return (
      <div className="App">
        <h2>Enter your movie name in the search bar below!</h2>
        <MovieSearch handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {this.state.movieData.map(movieData => (
          <MovieList key={movieData.imdbID} data={movieData} />
        ))}
      </div>
    );
  }
}*/

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
