import {thinky} from './thinky';

export const Sport = thinky.createModel('Sport', {
  name: thinky.type.string().required(),
  description: thinky.type.string().required(),
  beginnersAdvice: thinky.type.string(),
  estimatedTime: thinky.type.number().integer().min(0),
  image: thinky.type.string(),
});
