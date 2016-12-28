import {login, register, logout} from './auth';
import {addNotification} from './notifications';
import {startSession} from './session';

export default [
  // auth
  login,
  register,
  logout,
  addNotification,
  startSession,
];
