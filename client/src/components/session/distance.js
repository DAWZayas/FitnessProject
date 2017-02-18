import React, {Component} from 'react';
import {connect} from 'react-redux';

import {distanceCoords} from '../../util/distanceCoords';
import {updateSessionPosition} from '../../store/actions';

import {Map} from '../../components/session';

const mapDispatchToProps = dispatch => ({
  updatePosition: payload => dispatch(updateSessionPosition(payload)),
});

const mapStateToProps = state => ({
  session: state.session.position,
  sessionId: state.session.id,
});

class Distance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pos: [{lat: this.props.session.lat, lng: this.props.session.lng}],
      distance: 0,
      prueba: 0.001,
      prueba2: 0.001,
      timer: setInterval(
        () => this.getActualPosition(),
        3000
      ),
    };
    this.getActualPosition = this.getActualPosition.bind(this);
  }

  componentDidUpdate() {
    this.props.totalDistance(this.state.distance);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  getActualPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude + this.state.prueba,
        lng: position.coords.longitude + this.state.prueba2,
      };
      let distance = 0;
      if (this.state.pos) {
        const dist = distanceCoords(this.state.pos[this.state.pos.length - 1], pos);
        distance = !isNaN(dist) && Math.trunc(dist * 1000);
      }
      this.props.updatePosition({sessionId: this.props.sessionId, pos: JSON.stringify(pos)});
      this.setState({pos: [...this.state.pos, pos], distance: this.state.distance + distance, prueba: this.state.prueba + Math.random() * 0.001, prueba2: this.state.prueba2 + Math.random() * 0.001}); // warning setState con unmounted component
    });
  }

  render() {
    return (
      <div>
        <div className="card card-block text-xs-center light-gradient">
          <Map lat={this.props.session.lat} lng={this.props.session.lng} pos={this.state.pos[this.state.pos.length - 1]} line />
        </div>
        <div className="card card-block text-xs-center light-gradient">
          <h2>Distance: {this.state.distance} m.</h2>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Distance);
