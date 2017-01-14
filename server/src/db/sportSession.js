import {thinky} from './thinky';

export const SportSession = thinky.createModel('SportSession', {
  user: thinky.type.string().required(),
  sport: thinky.type.string().required(),
  startTime: thinky.type.date(),
  endTime: thinky.type.date(),
  duration: thinky.type.object().schema({
    hours: thinky.type.number().integer().min(0),
    minutes: thinky.type.number().integer().min(0),
    seconds: thinky.type.number().integer().min(0),
  }).required(),
  calories: thinky.type.number().integer().min(0),
  distance: thinky.type.number().min(0),
});
