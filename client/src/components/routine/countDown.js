import React, {Component} from 'react';
import {connect} from 'react-redux';

const countDownStyle = {
  fontFamily: 'sans-serif',
  display: 'inline-block',
  fontWeight: '100',
  textAlign: 'center',
  fontSize: '100px',
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
    if (this.state.time === -1) {
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
        <div key={this.state.time + 'audio'} className="text-center" style={countDownStyle}>
          <span >{this.state.time > 0 ? this.state.time :
            this.props.data === 'go' ? 'GO!' :
            this.props.data === 'rest' ? 'REST!' : 'STOP!'}</span>
          <audio autoPlay>
            {this.state.time >= 1 ? <source src={`../../../static/audio/${this.state.time}.mp3`} type="audio/mp3" /> : null}
            {this.state.time <= 0 ? <source src={`../../../static/audio/${this.props.data}.mp3`} type="audio/mp3" /> : null}
          </audio>
        </div>
      </div>
    );
  }
}
export default connect(null, null)(CountDown);
