import React, { Component } from 'react';
import poster1 from '../../resources/img/poster1.jpg';

export default class AppCover extends Component {
  render() {
    return (
      <>
        <div>
          <img src={poster1} width="1500" height="550" alt="poster" />
        </div>
      </>
    );
  }
}
