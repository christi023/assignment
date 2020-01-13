import React from 'react';
import $ from 'jquery';
// reference file
$(document).ready(() => {
  $('#searchForm').on('submit', e => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

export default function getMovies(searchText) {
  // make request to api using axios
  // make a request for a user with a given ID
  axios
    .get(
      'https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=' +
        searchText,
    )
    .then(response => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
        <div className = "col-md-3">
        <div className = "well text-center">
        <img src = "https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <h5>${movie.title}</h5>
        <a onclick="movieSelected('${movie.id}')"className="btn btn-primary" href="#">Movie Details</a>             
        </div>
        </div>        
        `;
      });

      $('#movies').html(output);
    })
    .catch(error => {
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  // Make request for a user with a given ID
  axios
    .get(
      'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=98325a9d3ed3ec225e41ccc4d360c817',
    )
    .then(response => {
      //console.log(response);
      let movie = response.data;
      //console.log(movie);

      let output = `
      <div className="row">
      <div className="col-md-4">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
      </div>
      </div className="col-md-8>
      <h2>${movie.title}</h2>
      <ul className="list-group>
      <li className="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}   
      </li>     
      <li className="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
      <li className="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>         
      <li className="list-group-item"><strong>Runtime:</strong> ${movie.runtime}</li> 
      <li className="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>    
      </ul>
      </div>
      </div>
      <div className="row">
      <div className="well"
      <h3>Plot</h3>
      ${movie.overview}
      <hr>
      <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" className="btn btn-primary">View IMDB</a>
      <a href="index.html" className="btn btn-default">Go Back To Search</a> 
      </div>
      </div>
      `;

      $('#movie').html(output);
    })
    .catch(error => {
      console.log(error);
    });
}
