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
    const data = {
      labels: ['cardio', 'strength', 'endurance', 'agility', 'power', 'stretching'],
      datasets: [
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [
            this.props.data.cardio,
            this.props.data.strength,
            this.props.data.endurance,
            this.props.data.agility,
            this.props.data.power,
            this.props.data.stretching
          ],
        }],
    };
    const canvasNode = document.getElementById(this.props.canvasId).getContext('2d');
    const myRadarChart = new Chart(canvasNode, {
      type: 'radar',
      data,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scale: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  render() {
    return (
      <canvas id={this.props.canvasId} height="250" style={{border: "1px solid white"}}></canvas>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RadarChart);
