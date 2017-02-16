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
      <h4 className="card-block card-title">Sport is life and life is sport</h4>
    </div>
    <div className="card card-block text-xs-center">
      <Slider />
      <h4 className="card-block text-xs-center">The longer and faster you can train your body, the greater you will improve aerobic and anaerobic fitness levels.</h4>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
