import React, { Component } from 'react';
//import Search from '../Search/Search';
import axios from 'axios';
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
}

/*class Movie extends React.Component {
  state = {
    movies: [],
    showCrawl: {},
  };

  componentDidMount() {
    this.handleMovies();
  }

  handleMovies = () =>
    fetch('http://www.omdbapi.com/?apikey=367da9d9')
      .then(results => results.json())
      .then(data => this.setState({ movies: data.results }));

  handleCrawl = e => {
    const { id } = e.target;
    this.setState(current => ({
      showCrawl: { ...current.showCrawl, [id]: !current.showCrawl[id] },
    }));
  };

  render() {
    return (
      <div>
        <h1>Movies</h1>
        <div>
          {this.state.movies.map(movie => (
            <div key={movie.episode_id} id={movie.episode_id} onClick={this.handleCrawl}>
              {movie.title}
              {this.state.showCrawl[movie.episode_id] && (
                <div style={{ border: '1px black solid' }}>{movie.opening_crawl}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}*/
