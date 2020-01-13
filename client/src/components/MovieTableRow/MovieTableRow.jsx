import React from 'react';

const MovieTableRow = props => {
  const { title, description, length, year, genre, hasSeen, isFavourite, _id } = props.movie; // obj de constructor what is needed  for our tb rows
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>{length}</td>
      <td>{year}</td>
      <td>{genre}</td>
      <td>{hasSeen}</td>
      <td>{isFavourite}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={props.showEditForm.bind(this, props.movie)}
            className="btn btn-success"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={props.deleteHandler.bind(this, _id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MovieTableRow;
