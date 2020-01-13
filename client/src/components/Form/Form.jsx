import React from 'react';
import Input from '../Input/Input';

const Form = props => {
  return (
    <form onSubmit={props.handler}>
      <h4>{props.isEditForm ? 'Editing Movie: ' : 'Add Movie: '}</h4>
      <div className="form-group">
        <Input
          name="title"
          placeholder="Enter Title"
          labelName="Title: "
          handleChange={props.handleChange}
          value={props.movie.title}
        />
        <Input
          name="description"
          placeholder="Enter Description"
          labelName="Description: "
          handleChange={props.handleChange}
          value={props.movie.description}
        />
        <Input
          name="length"
          placeholder="Enter Length"
          labelName="Length: "
          handleChange={props.handleChange}
          value={props.movie.length}
        />
        <Input
          name="year"
          placeholder="Enter Year"
          labelName="Year: "
          handleChange={props.handleChange}
          value={props.movie.year}
        />
        <Input
          name="genre"
          placeholder="Enter Genre"
          labelName="Genre: "
          handleChange={props.handleChange}
          value={props.movie.genre}
        />
        <Input
          name="hasSeen"
          placeholder="Enter Has Seen"
          labelName="Has Seen: "
          handleChange={props.handleChange}
          value={props.movie.hasSeen}
        />
        <Input
          name="isFavourite"
          placeholder="Enter Is Favourite"
          labelName="Is Favourite: "
          handleChange={props.handleChange}
          value={props.movie.isFavourite}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
