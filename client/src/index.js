// npm packages
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

// styles
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';

// our packages
import App from './app';
import store from './store';
import {requireAuth} from './util';

// our pages
import Welcome from './pages/welcome';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/notfound';

import Routine from './pages/routine';
import Stats from './pages/stats';
import Session from './pages/session';
import Profile from './pages/profile';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// render on page
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route path="welcome" component={Welcome} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="session" component={Session} />
        <Route path="routine" component={Routine} />
        <Route path="stats" component={Stats} />
        <Route path="profile" component={Profile} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
