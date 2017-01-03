import * as ActionTypes from '../actionTypes';

const initialState = {exercises: []};
export const routine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EXERCISE:
      return state;
    case ActionTypes.CREATE_ROUTINE:
      return state;
    case ActionTypes.GET_EXERCISES:
      return state;
    case ActionTypes.GET_EXERCISES_SUCCESS:
      return {...state, exercises: action.payload.exercises};
    default:
      return state;
  }
};
