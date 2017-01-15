import {login, register, logout, updateUser, updateProfile} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession, prepareSession} from './session';
import {createExercise, getExercises, createRoutine, getAllRoutines} from './routine';
import {getImages} from './images';

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
  createExercise,
  getExercises,
  createRoutine,
  getAllRoutines,
  getImages,
];
