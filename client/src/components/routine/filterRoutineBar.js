// npm packages
import React from 'react';

import {connect} from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});


const FilterRoutineBar = ({onUserInput}) => {
  let filterTextInput;

  const handleChange = () => {
    onUserInput(filterTextInput.value);
  };

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <form className="navbar-form navbar-right">
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
        </form>
      </div>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRoutineBar);
