// npm packages
import React, {Component} from 'react';
import Chart from 'chart.js';

import {connect} from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});

class DonutChart extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const data = {
      labels: [
        "Done",
        "Needed",
      ],
      datasets: [
        {
          data: [this.props.data1.n / 1000, this.props.data2.n / 1000],
          backgroundColor: [
            this.props.data1.color,
            this.props.data2.color,
          ],
          hoverBackgroundColor: [
            this.props.data1.color,
            this.props.data2.color,
          ],
          borderWidth: [
            0, 0,
          ],
        }],
    };
    const canvasNode = document.getElementById(this.props.canvasId).getContext('2d');
    const myDoughnutChart = new Chart(canvasNode, {
      type: 'doughnut',
      data,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        elements: {
          center: {
            text: this.props.data0,
            fontColor: '#424242',
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontSize: 20,
            fontStyle: 'normal'
          },
        },
      }
    });
    Chart.pluginService.register({
      beforeDraw: (chart) => {
        if (chart.config.options.elements.center) {
          const helpers = Chart.helpers;
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          const ctx = chart.chart.ctx;
          ctx.save();
          const fontSize = helpers.getValueOrDefault(chart.config.options.elements.center.fontSize, Chart.defaults.global.defaultFontSize);
          const fontStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontStyle, Chart.defaults.global.defaultFontStyle);
          const fontFamily = helpers.getValueOrDefault(chart.config.options.elements.center.fontFamily, Chart.defaults.global.defaultFontFamily);
          const font = helpers.fontString(fontSize, fontStyle, fontFamily);
          ctx.font = font;
          ctx.fillStyle = helpers.getValueOrDefault(chart.config.options.elements.center.fontColor, Chart.defaults.global.defaultFontColor);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(chart.config.options.elements.center.text, centerX, centerY);
          ctx.restore();
        }
      },
    });
  }

  render() {
    return (
      <canvas id={this.props.canvasId} height="114" style={{border: "1px solid transparent"}}></canvas>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonutChart);
