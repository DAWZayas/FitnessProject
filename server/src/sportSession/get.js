import {asyncRequest} from '../util';
import {SportSession} from '../db';

export default (app) => {
  app.get('/api/sportSession/:id', asyncRequest(async (req, res) => {
    try {
      const sportSession = await SportSession.get(req.params.id);
      res.send(sportSession);
    } catch (e) {
      res.status(400).send({error: 'SportSession not in the database'});
    }
  }));

  app.get('/api/sportSession/:user/all/', asyncRequest(async (req, res) => {
    try {
      const sportSessions = await SportSession.filter({user: req.params.user});
      res.send(sportSessions);
    } catch (e) {
      res.status(400).send({error: 'No sportSessions for this user'});
    }
  }));
};
