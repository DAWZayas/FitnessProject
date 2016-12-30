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
        <img src="http://2.gravatar.com/avatar/e9de252843e9ff541060127dac7126ed?s=150&d=mm&r=g"
          className="img-fluid rounded-circle z-depth-2"
          style={{display:"inlineBlock", margin:"auto", marginBottom:20}} />
      </div>


      <div className="col-xs-12 col-sm-8 text-xs-center text-sm-left">
        <strong>{user.login}</strong><br />
          Active Since {user.registrationDate}<br />
          <Link to="/" className="btn btn-default">Do Exercise!</Link><br />
          <Link to="/updateprofile" className="btn btn-default">Edit
          </Link>
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
                <td>Email:</td>
                <td>{user.mail}</td>
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
    <div className="card-block">
    <h3 className="h3-responsive text-xs-center">Last Session</h3>


    </div>
  </div>
  </div>


);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
