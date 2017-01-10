import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      loaded: false,
      poly: null,
    };
    // this.initMap = this.initMap.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidMount() {
    this.loadMap(this.node);
  }

  loadMap() {
    setTimeout(() => {
      this.setState({
        map: new google.maps.Map(this.node, {
          zoom: 14,
          center: {lat: 40.476938, lng: -3.857414},
        }),
        poly: new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 5,
        }),
      });
      this.state.poly.setMap(this.state.map);
      const path = this.state.poly.getPath();
      path.push(new google.maps.LatLng({lat: 40.476938, lng: -4.857414}));
      path.push(new google.maps.LatLng({lat: 41.476938, lng: -5.857414}));
      path.push(new google.maps.LatLng({lat: 42.476938, lng: -6.857414}));
    }, 0);
  }

  render() {
    return (
      <div>
        <div id="map" ref={node => this.node = node} style={{height: '300px'}}></div>
      </div>
    );
  }
}
