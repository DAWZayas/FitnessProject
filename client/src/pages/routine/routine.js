import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Routine = () => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    <h3 className="card card-block text-xs-center">Choose your option</h3>
    <div className="card">
      <div className="card-block light-gradient">
        <h4 className="card-title">Do a routine!</h4>
        <Link to="/routine/doRoutine" className="btn btn-default">Go!</Link>
      </div>
    </div>
    <div className="card">
      <div className="card-block light-gradient">
        <h4 className="card-title">Create routine</h4>
        <Link to="/routine/create" className="btn btn-default">Create</Link>
      </div>
    </div>
    <div className="card">
      <div className="card-block light-gradient">
        <h4 className="card-title">Create exercise</h4>
        <Link to="/routine/exercise" className="btn btn-default">Create</Link>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Routine);
