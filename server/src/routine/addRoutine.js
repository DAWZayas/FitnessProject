import {asyncRequest} from '../util';
import {Routine} from '../db';

export default (app) => {
  app.post('/api/routine', asyncRequest(async (req, res) => {
    const {user, name, level, rest, rounds, restRounds, exercises, image} = req.body;

    if (name === 'undefined') {
      res.status(400).send({error: 'Missing routine name'});
      return;
    }
    if (level === 'undefined' || rest === 'undefined' || rounds === 'undefined' || restRounds === 'undefined') {
      res.status(400).send({error: 'Missing to check level/rest/rounds/restRounds'});
      return;
    }
    if (JSON.parse(exercises).length <= 0) {
      res.status(400).send({error: 'No exercises added to the routine'});
      return;
    }
    if (typeof image === 'undefined' || image === 'undefined' || !image || image === '') {
      res.status(400).send({error: 'Missing routine image'});
      return;
    }

    const routine = new Routine({
      user,
      name,
      level,
      rest,
      rounds,
      restRounds,
      exercises: JSON.parse(exercises),
      image,
    });
    await routine.save();

    res.send(routine);
  }));
};
