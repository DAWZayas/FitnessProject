import React, {Component} from 'react';
import {connect} from 'react-redux';

import Slide from './slide';

const mapDispatchToProps = dispatch => ({
});

class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slides: [
        'http://mdbootstrap.com/img/Photos/Slides/img%20(18).jpg',
        'http://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg',
        'http://mdbootstrap.com/img/Photos/Slides/img%20(20).jpg',
      ],
      index: 0,
      timer: setInterval(
        () => this.setState({index: this.state.index >= this.state.slides.length - 1 ? 0 : ++this.state.index}),
        6000
      ),
    };
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  updateSlider() {
    const aux = [];
    for (let i = 0; i < this.state.slides.length; i++) {
      if (this.state.index === i) {
        aux[i] = (<Slide image={this.state.slides[i]} active="active" animation="fadeIn" />);
      } else {
        aux[i] = (<Slide image={this.state.slides[i]} active="" animation="fadeOut" />);
      }
    }
    return aux;
  }

  handlePrevious(e) {
    e.preventDefault();
    this.setState({index: this.state.index <= 0 ? this.state.slides.length - 1 : --this.state.index});
    clearInterval(this.state.timer);
    this.setState({timer: setInterval(
      () => this.setState({index: this.state.index >= this.state.slides.length - 1 ? 0 : ++this.state.index}),
      6000
    )});
    return false;
  }

  handleNext(e) {
    e.preventDefault();
    this.setState({index: this.state.index >= this.state.slides.length - 1 ? 0 : ++this.state.index});
    clearInterval(this.state.timer);
    this.setState({timer: setInterval(
      () => this.setState({index: this.state.index >= this.state.slides.length - 1 ? 0 : ++this.state.index}),
      6000
    )});
    return false;
  }

  render() {
    const slides = this.updateSlider();
    return (
      <div id="carousel-example-1" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          {slides}
        </div>
        <a className="left carousel-control" href="#carousel-example-1" role="button" onClick={this.handlePrevious}>
          <span className="icon-prev" aria-hidden="true"></span>
        </a>
        <a className="right carousel-control" href="#carousel-example-1" role="button" onClick={this.handleNext}>
          <span className="icon-next" aria-hidden="true"></span>
        </a>
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(Slider);
