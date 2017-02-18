import React, {Component} from 'react';

class ButtonObjectiveRoutine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse = (e) => {
    e.preventDefault();
    this.setState(
      {
        show: !this.state.show,
      }
    );
  };

  render() {
    return (
      <div>
        <div>
          <button className="btn light-grey-gradient white-text" id="routine" onClick={this.handleCollapse}>
            {this.props.sport} Objectives
          </button>
        </div>
        {this.state.show ? <div className="card-block text-xs-center animated flipInX">
          <h4 className="card-title">
            Weekly time <span className="tag badge grey">
              {Math.floor(this.props.userObjectives / 3600) + ' h ' +
              Math.floor((this.props.userObjectives % 3600) / 60) + ' m'}
            </span></h4>
        </div> : null}
      </div>
    );
  }
}
export default ButtonObjectiveRoutine;
