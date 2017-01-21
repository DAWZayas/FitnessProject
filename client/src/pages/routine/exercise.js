import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {createExercise, getImages} from '../../store/actions';

import modal from './modal.css';

const mapStateToProps = state => ({
  images: state.images.exercises,
});

const mapDispatchToProps = dispatch => ({
  onCreateExerciseClick: payload => dispatch(createExercise(payload)),
  onSelectImages: params => dispatch(getImages(params)),
});

let image;

const Exercise = ({onCreateExerciseClick, onSelectImages, images}) => {
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
      image: '' + image,
    });
    image = '';
  };

  const handleImages = () => {
    onSelectImages({folder: 'exercises'});
  };

  const selectImage = (e) => {
    image = e.target.src;
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
          <a className="btn btn-info" href="#images" onClick={handleImages}>Select image</a>
          {console.log(image)}
          {image ? <img src={image} width="50px" height="50px" alt="" /> : ''}
        </div>
        <div id="images" className={modal.overlay}>
          <div className={modal.popup}>
            <h2>Images</h2>
            <a className={modal.close} href="#a">&times;</a>
            <div className={modal.content}>
              <hr />
              {images ? images.map(img =>
                <a href="#a">
                  <img src={'http://localhost:8080/static/images/exercises/' + img} onClick={selectImage} width="50px" height="50px" alt="" />
                </a>
                ) : ''}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-default" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
