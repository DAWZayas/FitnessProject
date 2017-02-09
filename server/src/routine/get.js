import {asyncRequest} from '../util';
import {r, Routine} from '../db';

export default (app) => {
  app.get('/api/routine/:id', asyncRequest(async (req, res) => {
    try {
      const routine = await Routine.get(req.params.id);
      res.send(routine);
    } catch (e) {
      res.status(400).send({error: 'Error loading the routine'});
    }
  }));

  app.get('/api/routine/user/:user', asyncRequest(async (req, res) => {
    try {
      const routines = await Routine.filter({user: req.params.user});
      res.send(routines);
    } catch (e) {
      res.status(400).send({error: 'Error loading the routine'});
    }
  }));

  app.get('/api/routine/', asyncRequest(async (req, res) => {
    try {
      const skip = parseInt(req.query.skip, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 6;
      const routines = await r.table('Routine').skip(skip).limit(limit);
      res.send(routines);
    } catch (e) {
      res.status(400).send({error: 'Error retrieving all the routines'});
    }
  }));
};
