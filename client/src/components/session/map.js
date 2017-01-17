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

  componentWillReceiveProps(nextProps) {
    const path = this.state.poly.getPath();
    path.push(new google.maps.LatLng({lat: nextProps.pos.lat, lng: nextProps.pos.lng}));
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng({lat: nextProps.pos.lat, lng: nextProps.pos.lng}),
      title: '#' + path.getLength(),
      map: this.state.map,
    });
  }

  loadMap() {
    setTimeout(() => {
      this.setState({
        map: new google.maps.Map(this.node, {
          zoom: 14,
          center: {lat: this.props.lat, lng: this.props.lng},
        }),
        poly: new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 5,
        }),
        marker: new google.maps.Marker({
          position: new google.maps.LatLng(this.props.lat, this.props.lng),
          title: 'Origin',
        }),
      });
      this.state.poly.setMap(this.state.map);
      this.state.marker.setMap(this.state.map);
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
