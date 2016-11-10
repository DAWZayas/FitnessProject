import {SportSession} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/sportSession/:id', asyncRequest(async (req, res) => {
    const sportSession = await SportSession.get(req.params.id);
    sportSession.distance = 100;
    try {
      await sportSession.save();
    } catch (e) {
      res.status(400).send({error: e.toString()});
      return;
    }
  }));
};
