// npm packages
import React from 'react';

import {connect} from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});


const SearchBar = ({onUserInput}) => {
  let filterTextInput;

  const handleChange = () => {
    onUserInput(filterTextInput.value);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        id="searchInput"
        className="form-control"
        placeholder="Search..."
        ref={(input) => { filterTextInput = input; }}
        onChange={handleChange}
      />
    </div>

  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
