import {login, register, logout, updateProfile} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession} from './session';

export default [
  // auth
  login,
  register,
  updateProfile,
  logout,
  addNotification,
  startSession,
  finishSession,
];
