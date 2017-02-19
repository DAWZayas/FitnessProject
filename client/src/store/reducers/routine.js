import * as ActionTypes from '../actionTypes';

const initialState = {exercises: [], routines: [], routineStatus: 'inited', exerciseStatus: 'inited', hasMoreRoutines: true};
export const routine = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_EXERCISE:
      return state;
    case ActionTypes.CREATE_EXERCISE_SUCCESS:
      return {...state, exercises: [...state.exercises, action.payload]};
    case ActionTypes.CREATE_ROUTINE:
      return state;
    case ActionTypes.CREATE_ROUTINE_SUCCESS:
      return {...state, routines: [...state.routines, action.payload]};
    case ActionTypes.GET_EXERCISES:
      return {...state, exerciseStatus: 'loading'};
    case ActionTypes.GET_EXERCISES_SUCCESS:
      return {...state, exercises: action.payload.exercises, exerciseStatus: 'done'};
    case ActionTypes.GET_ALL_ROUTINES:
      return {...state, routineStatus: 'loading'};
    case ActionTypes.GET_ALL_ROUTINES_SUCCESS: {
      const hasMoreRoutines = action.payload.routines.length === 6;
      return {...state, routines: state.routines.concat(action.payload.routines), routineStatus: 'done', hasMoreRoutines};
    }
    case ActionTypes.CLEAR_ROUTINES:
      return initialState;
    default:
      return state;
  }
};
