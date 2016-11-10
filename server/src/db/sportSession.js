import {thinky} from './thinky';

export const SportSession = thinky.createModel('SportSession', {
  user: thinky.type.string().required(),
  sport: thinky.type.string().required(),
  startTime: thinky.type.date().default(thinky.r.now()),
  endTime: thinky.type.date(),
  duration: thinky.type.number().integer().min(0),
  calories: thinky.type.number().integer().min(0),
  distance: thinky.type.number().integer().min(0),
});
