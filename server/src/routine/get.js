import {asyncRequest} from '../util';
import {r, Routine} from '../db';

export default (app) => {
  app.get('/api/routine/:id', asyncRequest(async (req, res) => {
    try {
      const routine = await Routine.get(req.params.id);
      res.send(routine);
    } catch (e) {
      res.status(400).send({error: 'Routine not in the database'});
    }
  }));

  app.get('/api/routine/:user', asyncRequest(async (req, res) => {
    try {
      const routines = await Routine.filter({user: req.params.user});
      res.send(routines);
    } catch (e) {
      res.status(400).send({error: 'Routine not in the database'});
    }
  }));

  app.get('/api/routine/', asyncRequest(async (req, res) => {
    try {
      const routines = await r.table('Routine');
      res.send(routines);
    } catch (e) {
      res.status(400).send({error: 'Routine not in the database'});
    }
  }));
};
