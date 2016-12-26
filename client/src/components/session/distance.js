import React, {Component} from 'react';
import {connect} from 'react-redux';

// import {startSession} from '../../store/actions';

const mapDispatchToProps = dispatch => ({

});

class Distance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pos: [],
      distance: 0,
      timer: setInterval(
        () => this.getActualPosition(),
        3000
      ),
    };
    this.getActualPosition = this.getActualPosition.bind(this);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  getActualPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setState({pos: [...this.state.pos, pos]});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          {this.state.pos.map((pos) => (<div><span>Lat: {pos.lat}</span><span>Lon: {pos.lng}</span></div>))}
        </div>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(Distance);
