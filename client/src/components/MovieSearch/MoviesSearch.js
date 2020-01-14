import React, { useState } from 'react';

import './MovieSearch.css';

const Search = props => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <div className="App">
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <h2 className="col-12 text-center">Search Movie Here</h2>
            <form className="search">
              <input value={searchValue} onChange={handleSearchInputChanges} type="text" />
              <input onClick={callSearchFunction} type="submit" value="SEARCH" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
