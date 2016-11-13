import {asyncRequest} from '../util';
import {Sport} from '../db';

export default (app) => {
  app.get('/api/sport/:id', asyncRequest(async (req, res) => {
    try {
      const sport = await Sport.get(req.params.id);
      res.send(sport);
    } catch (e) {
      res.status(400).send({error: 'Sport not in the database'});
    }
  }));
};
