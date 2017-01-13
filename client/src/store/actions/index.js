import * as ActionTypes from '../actionTypes';

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const logoutAction = () => ({
  type: ActionTypes.DO_LOGOUT,
});

export const registerAction = payload => ({
  type: ActionTypes.DO_REGISTER,
  payload,
});

let nextNotificationId = 0;

/**
 * Add a notification to the store.
 * @param {String} text - text to display
 * @param {String} alertType - Bootstrap alert style: success | info | warning | danger
*/
export const addNotificationAction = ({text, alertType}) => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: {
    id: nextNotificationId++,
    text,
    alertType,
  },
});

/**
 * Remove a notification from the store.
 * @param {String} notificationId
*/

export const removeNotificationAction = notificationId => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  payload: {notificationId},
});

export const prepareSession = () => ({
  type: ActionTypes.PREPARE_SESSION,
});

export const startSession = (payload) => ({
  type: ActionTypes.START_SESSION,
  payload,
});

export const finishSession = (payload) => ({
  type: ActionTypes.FINISH_SESSION,
  payload,
});

export const createExercise = (payload) => ({
  type: ActionTypes.CREATE_EXERCISE,
  payload,
});

export const getExercises = () => ({
  type: ActionTypes.GET_EXERCISES,
});

export const createRoutine = (payload) => ({
  type: ActionTypes.CREATE_ROUTINE,
  payload,
});

export const getAllRoutines = () => ({
  type: ActionTypes.GET_ALL_ROUTINES,
});

export const updateUser = payload => ({
  type: ActionTypes.DO_UPDATE_USER,
  payload,
});

export const updateProfile = payload => ({
  type: ActionTypes.DO_UPDATE_PROFILE,
  payload,
});
