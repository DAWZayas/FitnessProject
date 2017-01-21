import * as ActionTypes from '../actionTypes';

const initialState = {exercises: [], routines: [], routineStatus: 'inited', exerciseStatus: 'inited'};
export const routine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EXERCISE:
      return state;
    case ActionTypes.CREATE_ROUTINE:
      return state;
    case ActionTypes.GET_EXERCISES:
      return {...state, exerciseStatus: 'loading'};
    case ActionTypes.GET_EXERCISES_SUCCESS:
      return {...state, exercises: action.payload.exercises, exerciseStatus: 'done'};
    case ActionTypes.GET_ALL_ROUTINES:
      return {...state, routineStatus: 'loading'};
    case ActionTypes.GET_ALL_ROUTINES_SUCCESS:
      return {...state, routines: action.payload.routines, routineStatus: 'done'};
    default:
      return state;
  }
};
