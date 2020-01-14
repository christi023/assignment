import React, { Component } from 'react';

// Packages
import 'tachyons';
import Particles from 'react-particles-js';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// components
import MovieTable from '../MovieTable/MovieTable';
import Form from '../Form/Form';
import Message from '../Message/Message';

import MovieAPI from '../../MovieAPI';
import './AddMovie.css';

const ParticleParams = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
      size: {
        value: 3,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  },
};

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
      isEditForm: false,
      movie: {
        title: '',
        description: '',
        length: '',
        year: '',
        genre: '',
        hasSeen: '',
        isFavourite: '',
      },
      message: '',
      // Setup state object
      // initialState,
    };

    // binding methods
    this.deleteHandler = this.deleteHandler.bind(this); //delete movie
    this.addHandler = this.addHandler.bind(this); // add movie
    this.updateHandler = this.updateHandler.bind(this); // update
    this.handleChange = this.handleChange.bind(this); // will be use for form
    this.showEditForm = this.showEditForm.bind(this); // set form to edit
    //this.onRouteChange = this.onRouteChange.bind(this);
    //this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    /*componentDidMount() {
      axios
        .get('http://localhost:5000/movies')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              movies: response.data.map(movie => movie.title),
              title: response.data[0].title,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });*/

    MovieAPI.getMovies().then(data => {
      console.log(data);
      this.setState({ movies: data.response });
    });
  }

  // setting functions
  resetForm() {
    // set form for movie obj
    this.setState({
      movie: {
        title: '',
        description: '',
        length: '',
        year: '',
        genre: '',
        hasSeen: '',
        isFavourite: '',
      },
    });
  }
  // handle change function to update movie
  handleChange(e) {
    this.setState({
      movie: {
        ...this.state.movie,
        [e.target.name]: e.target.value, // target by title and set the new value targeted, will work for all form fields
      },
    });
  }

  // show edit form function
  showEditForm(movie) {
    // passing as a prop to form component
    this.setState({ isEditForm: true, movie: movie });
  }

  // delete function - this will update our employees as well as our table and message component
  async deleteHandler(id) {
    const deleteData = await MovieAPI.deleteMovie(id);
    const message = deleteData.message;
    if (message.msgError) {
      this.setState({ message });
    } else {
      const data = await MovieAPI.getMovies();
      this.setState({ message, movies: data.response });
    }
  }

  // update handler function
  async updateHandler(e) {
    // will get executed as our onSubmit function
    e.preventDefault();
    const updateData = await MovieAPI.updateMovie(this.state.movie);
    const message = updateData.message;
    if (message.msgError) {
      this.setState({ message });
    } else {
      const data = await MovieAPI.getMovies();
      this.setState({ message, movies: data.response });
    } // reset the form below with reset function
    this.setState({ isEditForm: false });
    this.resetForm();
  }

  // add handler- will pass through the form component & use as onSubmit
  async addHandler(e) {
    // will get executed as our onSubmit function
    e.preventDefault(); // prevent default from happening
    const postData = await MovieAPI.createMovie(this.state.movie);
    const message = postData.message;
    if (message.msgError) {
      this.setState({ message });
    } else {
      const data = await MovieAPI.getMovies();
      this.setState({ message, movies: data.response });
    } // reset the form below with reset function, with every form submit
    this.resetForm();
  }

  // render movie table function
  renderMovieTable() {
    if (this.state.movies) {
      if (this.state.movies.length > 0) {
        return (
          <MovieTable
            movies={this.state.movies}
            deleteHandler={this.deleteHandler}
            showEditForm={this.showEditForm}
          />
        );
      }
      return null;
    }
  }

  // render form function
  renderForm() {
    return (
      <Form // form have 2 state edit and create form, check state with handler
        isEditForm={this.state.isEditForm}
        movie={this.state.movie}
        handleChange={this.handleChange}
        handler={!this.state.isEditForm ? this.addHandler : this.updateHandler}
      />
    ); // when user type in form this will get updated
  }

  // render message function
  renderMessage() {
    if (this.state.message === '')
      // don't render if empty
      return null;
    return <Message message={this.state.message} />;
  }

  render() {
    return (
      <>
        <div className="App">
          <Particles className="particles" params={ParticleParams} />
          <div className="row">
            <div className="col"></div>
            <div className="col-10">
              {this.renderMovieTable()}
              {this.renderForm()}
              {this.renderMessage()}
            </div>
            <div className="col"></div>
          </div>
          <div>{/*<MovieSearch />*/}</div>
        </div>
      </>
    );
  }
}
