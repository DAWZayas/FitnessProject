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
    <Slider />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
