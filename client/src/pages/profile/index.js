import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
});

const Profile = ({user}) => (
  <div className="jumbotron animated fadeInLeft">
      <div className="card-block">
      <div className="col-xs-12 col-sm-4">
        <img src="https://2.gravatar.com/avatar/e9de252843e9ff541060127dac7126ed?s=150&d=mm&r=g"
          className="img-fluid rounded-circle z-depth-2"
          style={{display:"inlineBlock", margin:"auto", marginBottom:20}} />
      </div>


      <div className="col-xs-12 col-sm-8 text-xs-center text-sm-left">
        <strong>{user.login}</strong><br />
          Active Since {user.registrationDate}<br />
          <Link to="/" className="btn btn-default">Do Exercise!</Link><br />
          <Link to="/updateUser" className="btn btn-default">Update User</Link>
          <Link to="/updateProfile" className="btn btn-default">Update Profile</Link>
          <Link to="/objectives" className="btn btn-default">Objectives</Link>
      </div>
    </div>

    <div className="card-block">
      <div className="col-xs-12 col-sm-10">
          <table className="table table-hover">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>Surname:</td>
                <td>{user.surname}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{user.age}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{user.country}</td>
              </tr>
              <tr>
                <td>Weight:</td>
                <td>{user.weight}</td>
              </tr>
              <tr>
                <td>Height:</td>
                <td>{user.height}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <div className="card">
      {user.objectives ?
        <div className="card-block">
          <h4 className="h3-responsive text-xs-center">Objectives</h4>
          <p>Final weight: {user.objectives.finalWeight} kg</p>
          <p>Running Km per week: {user.objectives.weekRunningKm}</p>
          <p>Cycling Km per week: {user.objectives.weekCyclingKm}</p>
          <p>Walking Km per week: {user.objectives.weekWalkingKm}</p>
          <p>Active day time: {user.objectives.activeTimeDay} m</p>
          <p>Exercises per week: {user.objectives.weekExercises}</p>
        </div>
      : 'No objectives yet'}
    </div>
  </div>


);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
