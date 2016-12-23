import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const Slide = (props) => (
  <div className={`carousel-item ${props.active} animated ${props.animation}`}>
    <img src={props.image} role="presentation" />
  </div>
);

export default connect(null, null)(Slide);
