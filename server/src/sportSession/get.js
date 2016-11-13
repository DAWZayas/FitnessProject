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
};
