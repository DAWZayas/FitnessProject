import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Home = () => (
  <div className="jumbotron animated fadeIn">

    <div className="card">
      <div className="card-block">
        <h4 className="card-title">Sport session</h4>
        <Link to="/session" className="btn btn-default">Go!</Link>
      </div>
    </div>

    <div className="card">
      <div className="card-block">
        <h4 className="card-title">Exercise routine</h4>
        <Link to="/routine" className="btn btn-default">Go!</Link>
      </div>
    </div>

    <div className="card">
      <div className="card-block">
        <h4 className="card-title">Exercise statistics</h4>
        <Link to="/stats" className="btn btn-default">Go!</Link>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
