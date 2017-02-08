import * as ActionTypes from '../actionTypes';

const initialState = {state: 0};
export const session = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PREPARE_SESSION:
      return {state: 1, sport: action.payload};
    case ActionTypes.PREPARE_SESSION_SUCCESS:
      return {...state, state: 1, position: action.payload};
    case ActionTypes.START_SESSION: {
      return {...state, state: 2};
    }
    case ActionTypes.START_SESSION_SUCCESS: {
      return {...state, id: action.payload.id};
    }
    case ActionTypes.FINISH_SESSION:
      return {...state};
    case ActionTypes.FINISH_SESSION_SUCCESS: {
      return {state: 3, ...action.payload};
    }
    default:
      return state;
  }
};
