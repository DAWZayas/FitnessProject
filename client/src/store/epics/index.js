import {login, register, logout, updateUser, updateProfile} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession, prepareSession, updateSessionPosition} from './session';
import {createExercise, getExercises, createRoutine, getAllRoutines} from './routine';
import {getImages} from './images';
import {addObservable} from './realtime';

export default [
  // auth
  login,
  register,
  updateUser,
  updateProfile,
  logout,
  addNotification,
  prepareSession,
  startSession,
  finishSession,
  updateSessionPosition,
  createExercise,
  getExercises,
  createRoutine,
  getAllRoutines,
  getImages,
  addObservable,
];
