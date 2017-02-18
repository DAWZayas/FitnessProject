import React, {Component} from 'react';

class ButtonObjective extends Component {

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
          <button className="btn light-grey-gradient white-text" id="run" onClick={this.handleCollapse}>
            {this.props.sport} Objectives
          </button>
        </div>
        {this.state.show ?
          <div className="card-block text-xs-center animated flipInX">
            <h4 className="card-title">
              Weekly <span className="tag badge grey">{Number(this.props.userObjectives).toFixed(1)} km</span>
            </h4>
            <h4 className="card-title">
              Monthly <span className="tag badge grey">{(Number(this.props.userObjectives) * 4.33).toFixed(1)} km</span>
            </h4>
            <h4 className="card-title">
              Annual <span className="tag badge grey">{(Number(this.props.userObjectives) * 52).toFixed(1)} km</span>
            </h4>
          </div> :
        null}
      </div>
    );
  }
}
export default ButtonObjective;
