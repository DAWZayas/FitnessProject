import {thinky} from './thinky';

export const Routine = thinky.createModel('Routine', {
  user: thinky.type.string().required(),
  name: thinky.type.string().required(),
  level: thinky.type.number(),
  rest: thinky.type.number().integer().min(0),
  rounds: thinky.type.number().integer().min(0),
  restRounds: thinky.type.number().integer().min(0),
  exercises: thinky.type.array().schema(
    thinky.type.object().schema({
      name: thinky.type.string().required(),
      image: thinky.type.string(),
      time: thinky.type.number().integer().min(0),
    }),
  ).default([]),
});
