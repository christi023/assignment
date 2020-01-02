import React, { Component } from 'react';
import Links from './components/Links/Links';
//import Logo from './Logo';
import NavBar from './components/Navbar/Navbar';
import Particles from 'react-particles-js';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles
          params={{
            particles: {
              number: {
                value: 50,
              },
              size: {
                value: 3,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
          }}
        />
        <Links />

        <NavBar />
      </div>
    );
  }
}
