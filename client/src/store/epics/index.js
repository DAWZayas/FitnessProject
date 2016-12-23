import {login, register, logout} from './auth';
import {addNotification} from './notifications';
import {helloWorld} from './helloworld';

export default [
  // auth
  login,
  register,
  logout,
  addNotification,
  // hello world
  helloWorld,
];
