import {thinky} from './thinky';

export const User = thinky.createModel('User', {
  login: thinky.type.string().required(),
  password: thinky.type.string(),
  registrationDate: thinky.type.date().default(thinky.r.now()),
  // name: thinky.type.string(),
  // surname: thinky.type.string(),
  // age: thinky.type.number(),
  // email: thinky.type.string(),
  // country: thinky.type.string(),
  // weight: thinky.type.number(),
  // height: thinky.type.number(),
});
