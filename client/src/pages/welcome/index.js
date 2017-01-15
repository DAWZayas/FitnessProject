import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Slider from '../../components/slider';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Welcome = () => (
  <div className="jumbotron">
    <div className="card text-xs-center">
      <div className="card-block">
        <h4 className="card-title">Sport is life and life is sport</h4>
      </div>
    </div>
    <Slider />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
