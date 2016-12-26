import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {prepareSession} from '../../store/actions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPrepareSession: () => dispatch(prepareSession()),
});

const Sessions = ({onPrepareSession}) => {
  const handleClick = (e) => {
    onPrepareSession();
  };
  return (
    <div className="jumbotron animated fadeIn">

      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Running session</h4>
          <Link to="/session" className="btn btn-default" onClick={handleClick}>Go!</Link>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
