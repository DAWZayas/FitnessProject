import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';

import {createExercise, getImages} from '../../store/actions';

import modal from './modal.css';

const mapStateToProps = state => ({
  images: state.images.exercises,
  statusImages: state.images.state,
});

const mapDispatchToProps = dispatch => ({
  onCreateExerciseClick: payload => dispatch(createExercise(payload)),
  onSelectImages: params => dispatch(getImages(params)),
});

let image;

const Exercise = ({onCreateExerciseClick, onSelectImages, images, statusImages}) => {
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
    <div className="card-block z-depth-1 grey lighten-5">
      <h2>Create exercise</h2>
        <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Exercise name"
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
          <input
            type="number"
            className="form-control"
            id="inputCalories"
            placeholder="Calories"
            ref={(i) => { calories = i; }}
          />
        </div>
        <div className="form-group">
          <a className="btn btn-info btn-sm" href="#images" onClick={handleImages}>Select image</a>
          {image ? <img src={image} width="50px" height="50px" alt="" /> : ''}
        </div>
        <div id="images" className={modal.overlay}>
          <div className={modal.popup}>
            <h2>Images</h2>
            <a className={modal.close} href="#a">&times;</a>
            <hr />
            <div className={modal.content}>
              {images !== undefined ? images.map(img =>
                <a href="#a" key={img + 'selectImage'}>
                  <img src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/exercises/` + img} className="col-xs-6 col-md-4 col-lg-3" onClick={selectImage} alt="" />
                </a>
              ) : <div className="text-xs-center"><Loader /></div>}
              <hr />
            </div>
          </div>
        </div>
        </form>
        </div>
        <div className="card-block text-xs-center">
          <button type="submit" className="btn btn-default" onClick={handleClick}>Create</button>
          <Link to="/routine" className="btn btn-danger">Back</Link>
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercise);
