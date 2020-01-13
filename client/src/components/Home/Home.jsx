import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import { Route } from 'react-router-dom';
// Initial State for signin / register
const initialState = {
  route: 'signin',
  isSignedIn: false,
  onInputChange: '',
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    joined: '',
  },
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
    };
    // binding methods
    this.onRouteChange = this.onRouteChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        joined: data.joined,
      },
    });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === '/Home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === '/addMovie' ? (
          <div>
            <Route exact path="/Home" component={Home} />
          </div>
        ) : route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}
