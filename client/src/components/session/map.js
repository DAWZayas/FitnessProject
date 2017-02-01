import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      loaded: false,
      poly: null,
      marker: null,
    };
    // this.initMap = this.initMap.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidMount() {
    this.loadMap(this.node);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.line) {
      const path = this.state.poly.getPath();
      path.push(new google.maps.LatLng({lat: nextProps.pos.lat, lng: nextProps.pos.lng}));
    }

    if (this.props.athletes) {

      if (this.state.marker) { this.state.marker.setMap(null); }

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng({lat: nextProps.pos.lat, lng: nextProps.pos.lng}),
        title: '#',
        map: this.state.map,
      });
      this.setState({marker});
    }
  }

  loadMap(node) {
    setTimeout(() => {
      if (this.node) {
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
          markerOrigin: new google.maps.Marker({
            position: new google.maps.LatLng(this.props.lat, this.props.lng),
            title: 'Origin',
          }),
        });

        if (this.props.line) { this.state.poly.setMap(this.state.map); }

        this.state.markerOrigin.setMap(this.state.map);
      }
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
