import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {server as serverConfig} from '../../../config';

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
});

const Profile = ({user}) => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    <div className="card-block row">
      <div className="col-xs-12 col-sm-4">
        <img
          key={Math.random() + 'avatar'}
          src={user.image ||
            `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/profiles/default.png`}
          className="img-fluid rounded-circle z-depth-2"
          style={{display: "inlineBlock", margin: "auto", marginBottom: 20, width: '40vw'}}
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-xs-center">
        <strong>{user.login}</strong><hr />
          Active Since {new Date(user.registrationDate).toLocaleDateString()}<hr />
      </div>
    </div>

    <div className="">
      <h4 className="card-title text-xs-center">Profile info</h4>
      <div className="col-xs-12 col-sm-10">
          <table className="table">
            <tbody>
              <tr>
                <td><i className="fa fa-user fa-lg" aria-hidden="true"></i> Name</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td><i className="fa fa-envelope fa-lg" aria-hidden="true"></i> Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><i className="fa fa-calendar-o fa-lg" aria-hidden="true"></i> Age</td>
                <td>{user.age}</td>
              </tr>
              <tr>
                <td><i className="fa fa-tag fa-lg" aria-hidden="true"></i> Weight</td>
                <td>{user.weight}</td>
              </tr>
              <tr>
                <td><i className="fa fa-male fa-lg" aria-hidden="true"></i> Height</td>
                <td>{user.height}</td>
              </tr>
              <tr><td /><td /></tr>
            </tbody>
          </table>
      </div>
    </div>
    <div className="card-block">
      <div className="col-xs-12 text-xs-center">
        <Link to="/updateUser" className="btn btn-default">Update<br />User</Link>
        <Link to="/updateProfile" className="btn btn-default">Update<br />Profile</Link>
        <Link to="/objectives" className="btn btn-default">Change<br />Objectives</Link>
      </div>
    </div>
  </div>


);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
