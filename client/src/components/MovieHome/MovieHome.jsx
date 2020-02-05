import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MovieHome.css';
import Movie from './MovieHome';

export default class MovieHome extends Component {
  state = {
    movies: [],
    selectedPostId: null,
  };

  getMovies = () => {
    axios.get('http://localhost:5001/api/movie').then(response => {
      this.setState({ movies: response.data.movie });
    });
  };
  movieSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const movies = this.state.movies.map(movie => {
      return (
        <Link to={'/movie' + movie._id} key={movie._id}>
          <Movie title={movie.title} clicked={() => this.movieSelectedHandler(movie._id)} />
        </Link>
      );
    });

    return (
      <div>
        <section className="Movie">{movies}</section>
        <section></section>
      </div>
    );
  }
}
