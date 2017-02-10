// npm packages
import React, {Component} from 'react';
import Chart from 'chart.js';

import {connect} from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});

class RadarChart extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <canvas id={this.props.canvasId} height="114" style={{border: "1px solid white"}}></canvas>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RadarChart);
