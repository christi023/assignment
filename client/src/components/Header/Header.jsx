import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <>
        <div className="header">
          <h1>Movie Search App</h1>
          <p>
            Welcome to the world's best movie search app. This app is using the MovieDB database to
            render data and movie information.
          </p>
        </div>
      </>
    );
  }
}
