import React, { Component } from 'react';
// component imports
import AddMovie from './components/AddMovie/AddMovie';
import Home from './components/Home/Home';
import MovieService from './components/MovieService/MovieService';
import Movie from './components/Movie/Movie';
import MovieList from './components/MovieList/MovieList';
import AppCover from './components/AppCover/AppCover';
import { Route, NavLink, HashRouter } from 'react-router-dom';

// style imports
import './App.css';
import Particles from 'react-particles-js';
import 'tachyons';

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

export default class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <div className="App">
            <Particles className="particles" params={ParticleParams} />
            <div>
              <h1>Movie App</h1>
              <ul className="header">
                <li>
                  <NavLink exact to="/cover">
                    Cover
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/Home">
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/movie">Movie</NavLink>
                </li>

                <li>
                  <NavLink to="/results">Saved Movies</NavLink>
                </li>

                <li>
                  <NavLink to="/addMovie">AddMovie</NavLink>
                </li>
                <li>
                  <NavLink to="/MovieService">Movie Details</NavLink>
                </li>
              </ul>

              <div className="content">
                <Route path="/cover" component={AppCover} />
                <Route path="/Home" component={Home} />
                <Route path="/results" component={MovieList}></Route>
                <Route path="/addMovie" component={AddMovie} />
                <Route path="/MovieService" component={MovieService} />
                <div className="App">
                  <Route path="/movie" exact component={Movie} />
                </div>
              </div>
            </div>
          </div>
        </HashRouter>
      </>
    );
  }
}
