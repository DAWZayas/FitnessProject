import {thinky} from './thinky';

export const Diet = thinky.createModel('Diet', {
  name: thinky.type.string().required(),
  type: thinky.type.string(),
  description: thinky.type.string().required(),
  estimatedCalories: thinky.type.number(),
});
