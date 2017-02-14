import {asyncRequest} from '../util';
import {Exercise} from '../db';

export default (app) => {
  app.post('/api/exercise', asyncRequest(async (req, res) => {
    const {name, kind, description, calories, image} = req.body;

    if (!name) {
      res.status(400).send({error: 'Missing exercise name'});
      return;
    }
    if (!kind) {
      res.status(400).send({error: 'Missing exercise kind'});
      return;
    }
    if (!description) {
      res.status(400).send({error: 'Missing exercise description'});
      return;
    }
    if (!calories) {
      res.status(400).send({error: 'Missing exercise calories'});
      return;
    }
    if (typeof image === 'undefined' || image === 'undefined' || !image || image === '') {
      res.status(400).send({error: 'Missing exercise image'});
      return;
    }

    const sport = new Exercise({
      name,
      kind,
      description,
      calories,
      image,
    });
    await sport.save();

    res.send(sport);
  }));
};
