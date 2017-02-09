import {asyncRequest} from '../util';
import {r, Exercise} from '../db';

export default (app) => {
  app.get('/api/exercise/:id', asyncRequest(async (req, res) => {
    try {
      const exercise = await Exercise.get(req.params.id);
      res.send(exercise);
    } catch (e) {
      res.status(400).send({error: 'Error loading the exercise'});
    }
  }));

  app.get('/api/exercise/', asyncRequest(async (req, res) => {
    try {
      const exercises = await r.table('Exercise');
      res.send(exercises);
    } catch (e) {
      res.status(400).send({error: 'Error loading all the exercises'});
    }
  }));
};
