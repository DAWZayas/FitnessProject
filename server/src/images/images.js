import fs from 'fs';

import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/images/:folder', asyncRequest(async (req, res) => {
    try {
      const images = fs.readdirSync(__dirname + '/../../public/images/' + req.params.folder + '/');
      res.send({[req.params.folder]: images});
    } catch (e) {
      res.status(400).send({error: 'Error loading carousel images'});
    }
  }));
};
