import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
});

class CountDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: 5,
      timer: setInterval(
        () => this.setState({time: --this.state.time}),
        1000
      ),
    };
  }

  componentDidUpdate() {
    if (this.state.time === 0) {
      clearInterval(this.state.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div>
        {this.state.time}
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(CountDown);
