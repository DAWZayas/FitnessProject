import {thinky} from './thinky';

export const Sport = thinky.createModel('Sport', {
  name: thinky.type.string().required(),
  description: thinky.type.string().required(),
  beginnersAdvice: thinky.type.string().optional(),
  estimatedTime: thinky.type.number().integer().min(0).optional(),
  image: thinky.type.string().optional(),
});
