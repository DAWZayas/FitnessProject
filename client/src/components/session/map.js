import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      loaded: false,
      poly: null,
      markers: {},
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
      const newPos = new google.maps.LatLng({lat: nextProps.pos.lat, lng: nextProps.pos.lng});
      path.push(newPos);
      this.state.map.setCenter(newPos);
    }

    if (this.props.athletes) {
      const markers = {};
      for (const athlete in nextProps.athletesObject) {
        if (this.state.markers[athlete]) {
          this.state.markers[athlete].setMap(null);
        }
        if (athlete !== undefined) {
          markers[athlete] = new google.maps.Marker({
            position: new google.maps.LatLng({lat: nextProps.athletesObject[athlete].pos.lat, lng: nextProps.athletesObject[athlete].pos.lng}),
            title: nextProps.athletesObject[athlete].athlete,
            map: this.state.map,
          });
        }
      }
      this.setState({markers});
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

        if (this.props.athletes) {
          const athletesCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.6,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
            map: this.state.map,
            center: {lat: this.props.lat, lng: this.props.lng},
            radius: 1000,
          });
        }

        this.state.markerOrigin.setMap(this.state.map);
      }
    }, 0);
  }

  render() {
    return (
      <div>
        <div id="map" ref={node => this.node = node} style={{height: '60vw'}}></div>
      </div>
    );
  }
}
