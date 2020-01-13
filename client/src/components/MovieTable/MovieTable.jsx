import React from 'react';
import MovieTableRow from '../../components/MovieTableRow/MovieTableRow';

const MovieTable = props => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Length</th>
          <th scope="col">Year</th>
          <th scope="col">Genre</th>
          <th scope="col">Has Seen</th>
          <th scope="col">Is Favourite</th>
        </tr>
      </thead>
      <tbody>
        {props.movies.map(movie => {
          return (
            <MovieTableRow
              key={movie._id}
              movie={movie}
              deleteHandler={props.deleteHandler}
              showEditForm={props.showEditForm}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
