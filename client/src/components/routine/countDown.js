import React, {Component} from 'react';
import {connect} from 'react-redux';

const countDownStyle = {
  fontFamily: 'sans-serif',
  display: 'inline-block',
  fontWeight: '100',
  textAlign: 'center',
  fontSize: '50px',
};

class CountDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      timer: setInterval(
        () => this.setState({time: --this.state.time}),
        1000
      ),
    };
  }

  componentDidUpdate() {
    if (this.state.time === 0) {
      clearInterval(this.state.timer);
      this.props.action(this.props.data);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div className="container">
        <div className="text-center" style={countDownStyle}>
          <span >{this.state.time}</span>
        </div>
      </div>
    );
  }
}
export default connect(null, null)(CountDown);
