import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
});

const divStyle = {
  padding: '10px',
  borderRadius: '3px',
  background: '#00BF96',
  display: 'inline-block',
  margin: '0 auto',
};

const spanStyle = {
  padding: '5px',
  background: '#00816A',
  display: 'inline-block',
};

const timerStyle = {
  fontFamily: 'sans-serif',
  color: '#fff',
  display: 'inline-block',
  fontWeight: '100',
  textAlign: 'center',
  fontSize: '30px',
};

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hr: 0,
      min: 0,
      sec: 0,
      csec: 0,
      timer: setInterval(
        () => this.chrono(),
        10
      ),
    };
    this.chrono = this.chrono.bind(this);
  }


  componentDidUpdate() {

  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  chrono() {
    this.setState({csec: ++this.state.csec});
    if (this.state.csec === 100) {
      this.setState({csec: 0, sec: ++this.state.sec});
    }
    if(this.state.sec === 60) {
      this.setState({sec: 0, min: ++this.state.min});
    }
    if(this.state.min === 60) {
      this.setState({min: 0, hr: ++this.state.hr});
    }
  }

  render() {
    return (
      <div className="flex-center" style={timerStyle}>
        <div style={divStyle}>
          <span style={spanStyle}>{(this.state.hr < 10) ? "0" + this.state.hr : this.state.hr} :</span>
          <span style={spanStyle}>{(this.state.min < 10) ? "0" + this.state.min : this.state.min} :</span>
          <span style={spanStyle}>{(this.state.sec < 10) ? "0" + this.state.sec : this.state.sec} :</span>
          <span style={spanStyle}>{(this.state.csec < 10) ? "0" + this.state.csec : this.state.csec}</span>
        </div>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(Timer);
