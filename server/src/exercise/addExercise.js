import {asyncRequest} from '../util';
import {Exercise} from '../db';

export default (app) => {
  app.post('/api/exercise', asyncRequest(async (req, res) => {
    const {name, kind, description, calories, image} = req.body;
    const sport = new Exercise({
      name,
      kind,
      description,
      calories,
      image,
    });
    await sport.save();

    res.sendStatus(201);
  }));
};
