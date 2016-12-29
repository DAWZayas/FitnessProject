import {thinky} from './thinky';

export const Exercise = thinky.createModel('Exercise', {
  name: thinky.type.string().required(),
  kind: thinky.type.string(),
  description: thinky.type.string(),
  calories: thinky.type.number(),
  image: thinky.type.string(),
});
