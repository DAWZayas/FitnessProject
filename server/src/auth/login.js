// npm packages
import passport from 'passport';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import oauthshim from 'oauth-shim';

// our packages
import {auth as authConfig} from '../../config';

export default (app) => {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
      const token = jwt.sign(req.user, authConfig.jwtSecret);
      res.send({user: req.user, token});
    } else {
      res.status(401).send({error: 'Error logging in!'});
    }
  });

  app.post('/api/oauth/login', (req, res) => {
    switch (req.body.provider) {
      case 'google': {
        const options = {
          method: 'GET',
          headers: {Authorization: 'Bearer ' + req.body.token},
        };
        fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', options)
          .then(response => response.json())
          .then((googleUser) => {
            const token = jwt.sign(googleUser, authConfig.jwtSecret);
            res.send({user: {login: googleUser.given_name}, token});
          })
          .catch(() => res.status(401).send({error: 'Error logging in!'}));
        break;
      }
      case 'github': {
        const options = {
          method: 'GET',
          headers: {Authorization: 'token ' + req.body.token},
        };
        fetch('https://api.github.com/user', options)
          .then(response => response.json())
          .then((githubUser) => {
            const token = jwt.sign(githubUser, authConfig.jwtSecret);
            res.send({user: {login: githubUser.login}, token});
          })
          .catch(() => res.status(401).send({error: 'Error logging in!'}));
        break;
      }
      default:
        res.status(401).send({error: 'Error logging in!'});
    }
  });

  app.all('/oauthproxy', oauthshim);
  oauthshim.init([{
    client_id: authConfig.github.clientID,
    client_secret: authConfig.github.clientSecret,
    grant_url: authConfig.github.grantURL,
    domain: authConfig.github.domain,
  }]);
};
