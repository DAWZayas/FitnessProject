import passport from 'passport';
import fs from 'fs';

import {User} from '../db';
import {hash, asyncRequest} from '../util';
import {server as serverConfig} from '../../config';

export default (app) => {
  app.post('/api/user/profile/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {

    const {name, age, email, weight, height, image} = req.body;
    const {weekRunningKm, weekCyclingKm, weekWalkingKm, finalWeight, weekTimeExercises} = req.body;
    const user = await User.get(req.params.id);
    if (req.user.id !== req.params.id) {
      res.status(403).send({error: 'Not enough rights to change other user profile!'});
      return;
    }

    if (!user.objectives) {
      user.objectives = {};
    }
    // Update objectives data
    if (weekRunningKm) {
      user.objectives.weekRunningKm = weekRunningKm;
    }
    if (weekCyclingKm) {
      user.objectives.weekCyclingKm = weekCyclingKm;
    }
    if (weekWalkingKm) {
      user.objectives.weekWalkingKm = weekWalkingKm;
    }
    if (finalWeight) {
      user.objectives.finalWeight = finalWeight;
    }
    if (weekTimeExercises) {
      user.objectives.weekTimeExercises =
        (Number(weekTimeExercises.slice(0, 2)) * 3600) +
        (Number(weekTimeExercises.slice(3)) * 60);
    }

    // update profile data
    if (image) {
      const base64Data = decodeURIComponent(image).replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(__dirname + '/../../public/images/profiles/' + req.params.id + '.png', base64Data, 'base64');
      user.image = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/profiles/` + req.params.id + '.png';
    }
    if (name) {
      user.name = name;
    }
    if (age) {
      user.age = age;
    }
    if (email) {
      user.email = email;
    }
    if (weight) {
      user.weight = weight;
    }
    if (height) {
      user.height = height;
    }

    // send succcess
    try {
      await user.save();
    } catch (e) {
      res.status(400).send({error: e.toString()});
      return;
    }
    delete user.password;
    res.send(user);
  }));
};
