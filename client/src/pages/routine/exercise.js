import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {createExercise} from '../../store/actions';

const mapStateToProps = state => ({
  redirectToLogin: state.auth.redirectToLogin,
});

const mapDispatchToProps = dispatch => ({
  onCreateExerciseClick: payload => dispatch(createExercise(payload)),
});

const Exercise = ({onCreateExerciseClick}) => {
  let name;
  let kind;
  let description;
  let calories;
  // let image;

  const handleClick = (e) => {
    e.preventDefault();

    onCreateExerciseClick({
      name: name.value,
      kind: kind.value,
      description: description.value,
      calories: calories.value,
      // image: image.value,
    });
  };

  return (
    <div className="jumbotron animated fadeIn">
      <h2>Create exercise</h2>
      <form>
        <div className="form-group">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="exercise"
            ref={(i) => { name = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputKind">Kind</label>
          <select className="form-control" id="inputKind" ref={(i) => { kind = i; }}>
            <option defaultValue>cardio</option>
            <option>strength</option>
            <option>endurance</option>
            <option>agility</option>
            <option>power</option>
            <option>stretching</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inputDescription">Description</label>
          <textarea
            className="form-control"
            id="inputDescription"
            ref={(i) => { description = i; }}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="inputCalories">Calories</label>
          <input
            type="text"
            className="form-control"
            id="inputCalories"
            placeholder="calories"
            ref={(i) => { calories = i; }}
          />
        </div>
        <div className="form-group">
          <label className="btn btn-primary" htmlFor="inputImage">
            <input id="inputImage" type="file" style={{display: 'none'}} />
            Browse image
          </label>
        </div>
        <button type="submit" className="btn btn-default" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
