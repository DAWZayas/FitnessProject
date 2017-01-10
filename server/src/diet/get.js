import {asyncRequest} from '../util';
import {r, Diet} from '../db';

export default (app) => {
  app.get('/api/diets/:id', asyncRequest(async (req, res) => {
    try {
      const diet = await Diet.get(req.params.id);
      res.send(diet);
    } catch (e) {
      res.status(400).send({error: 'Diet not in the database'});
    }
  }));

  app.get('/api/diets/', asyncRequest(async (req, res) => {
    try {
      const diet = await r.table('Diet');
      res.send(diet);
    } catch (e) {
      res.status(400).send({error: 'Diet not in the database'});
    }
  }));
};
