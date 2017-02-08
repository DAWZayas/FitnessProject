import * as ActionTypes from '../actionTypes';

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const loginOauthAction = payload => ({
  type: ActionTypes.DO_OAUTH_LOGIN,
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

export const prepareSession = (payload) => ({
  type: ActionTypes.PREPARE_SESSION,
  payload,
});

export const startSession = (payload) => ({
  type: ActionTypes.START_SESSION,
  payload,
});

export const finishSession = (payload) => ({
  type: ActionTypes.FINISH_SESSION,
  payload,
});

export const updateSessionPosition = (payload) => ({
  type: ActionTypes.UPDATE_SESSION_POSITION,
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

export const getAllRoutines = payload => ({
  type: ActionTypes.GET_ALL_ROUTINES,
  payload,
});

export const updateUser = payload => ({
  type: ActionTypes.DO_UPDATE_USER,
  payload,
});

export const updateProfile = payload => ({
  type: ActionTypes.DO_UPDATE_PROFILE,
  payload,
});

export const getImages = payload => ({
  type: ActionTypes.GET_IMAGES,
  payload,
});

export const addObservable = observable => ({
  type: ActionTypes.ADD_OBSERVABLE,
  payload: observable,
});

export const removeObservable = observable => ({
  type: ActionTypes.REMOVE_OBSERVABLE,
  payload: observable,
});

export const retrieveStatsData = payload => ({
  type: ActionTypes.RETRIEVE_STATS_DATA,
  payload,
});
